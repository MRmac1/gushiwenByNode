#!/usr/bin/env node
/**
 * 爬取古诗文网站 使用es6语法 使用Generator控制流程
 * 2016年04月13日19:06:20
 */
const cheerio = require('cheerio');
const fetch = require('fetch');
const config = require('../config/config');
const process = require('process');
const shelljs = require('shelljs');
const querystring = require('querystring');

const spiderDB = require('./spiderDB');

var commandOptions = {
    alias : 'dynasty',
    demand: true,
    default: '魏晋',
    describe: '朝代名称'
};

//设置帮助提示
var argv = require('yargs')
    .option('d', commandOptions)
    .usage('Usage: node -d dynastyName')
    .example('node spiderShiwen -d 魏晋')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2016')
    .argv;
//得到要爬取的朝代名称
var dynastyName = argv.dynasty;

var seedUrl = 'http://so.gushiwen.org/type.aspx?' + querystring.stringify({c : dynastyName}, null, null, {encodeURIComponent: 'gbk'});

//得到pages
var getPages = function (seedUrl) {
    return new Promise(function (resolve, reject){
        superagent.get(seedUrl).end(function (err, HTMLContent) {
            if (err) reject(err);
            var $ = cheerio.load(HTMLContent.text);
            let pageText = $('.pages > span:last-child').text();
            let posts = pageText.match(/[0-9]+/i), pages;
            posts%10 == 0 ? pages = posts/10 : pages = posts/10 + 1;
            resolve(parseInt(pages));
        });
    });
};

//爬取列表页,获取所有的文章链接
var crawlListPage = function (listUrl) {
    return new Promise(function (resolve, reject){
        superagent.get(listUrl).end(function (err, HTMLContent) {
            if (err) reject(err);
            var $ = cheerio.load(HTMLContent.text);
            let postsUrls = [];
            $('.sons > p:nth-child(2)').each(function(index, elem) {
                let param = '';
                $(elem).find('a').length == 0 ? param = $(elem).prev('p').find('a').attr('href')
                    : param = $(elem).find('a').attr('href');
                let url = 'http://so.gushiwen.org' + param;
                postsUrls.push(url);
            });
            //得到postsUrls然后进行detail分析
            resolve(postsUrls);
        });
    });
};

//爬取详细页,获取文章信息
var crawDetailPage = function (detailUrl) {
    return new Promise(function (resolve, reject) {
        superagent.get(detailUrl).end(function (err, HTMLContent) {
            if (err) reject(err);
            var $ = cheerio.load(HTMLContent.text);
            let [title, mainContentDiv, author, authorUrl, originalText, fanyiUrls, shangxiUrls] = [$('.son1').eq(1).find('h1').text(),
                $('.son2').eq(1), '', '', '', [], []];
            let authorMarker = mainContentDiv.find('p').eq(1).find('a');
            let originalTextMarker = mainContentDiv.find('p').eq(2);
            //作者不存在的情况
            if ( authorMarker.length != 0 ) {
                author = authorMarker.text();
                authorUrl = authorMarker.attr('href')
            } else {
                author = '';
                authorUrl = '佚名';
            }
            console.log(title + author + authorUrl);
            let nextSiblings = originalTextMarker.nextAll();
            //获取原文
            for ( let i = 0; i < nextSiblings.length; i ++ ) {
                let chunk;
                if ( nextSiblings[i].name == 'br' ) {
                    //不规则情况
                    chunk = nextSiblings[i].prev.data.trim();
                    originalText += chunk ;
                    if ( i == nextSiblings.length - 1 ) {
                        originalText += nextSiblings[i].next.data.trim();//最后一个加上next情况
                    }
                } else {
                    chunk = $(nextSiblings[i]).text();
                    originalText += chunk ;
                }
            }
            $('.son5').each(function( index, ele) {
                let url = commonConfig.seedHost + $(ele).find('a').attr('href');
                url.includes('fanyi') ? fanyiUrls.push(url) : '';
                url.includes('shangxi') ? shangxiUrls.push(url) : '';
            });

            let result = {
                "url": detailUrl,
                "title": title,
                "author": author,
                "authorUrl": authorUrl,
                "originalText": originalText,
                "fanyiUrls": fanyiUrls,
                "shangxiUrls": shangxiUrls
            };
            resolve(result);
        });
    });
};

function* crawlJob() {
    let pages = yield getPages(seedUrl);
    //得到pages再进行一次循环
    let listUrls = [];
    for ( let page = 1; page <= pages; page ++ ) {
        let listUrl = seedUrl + '&p=' + page;
        listUrls.push(listUrl);
    }
    let listPromises = listUrls.map(crawlListPage); //得到promise数组
    for ( let listPromise of listPromises ) {
        let postsUrls = yield listPromise;
        //得到postUrls进行详细页抓取
        let detailPromises = postsUrls.map(crawDetailPage);
        for ( let detailPromise of detailPromises ) {
            let result = yield detailPromise;
            //存入数据库
            process.nextTick(() => {
                spiderDB.addResult(result)
            });
        }
    }
    return {
        pages: pages
    }
}
co(crawlJob).then(function(result) {
    console.log(result);
}, function (err) {
    console.error(err.stack);
});
