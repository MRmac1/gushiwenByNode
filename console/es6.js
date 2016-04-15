/**
 * Created by mr_mac1 on 16/4/13.
 */
import 'babel-polyfill';
const [fs, co, superagent, commonConfig] = [require('fs'), require('co'), require('superagent'), require('../config/config_dev')]; //数组的解构赋值


//改写fs.readFile为promise返回对象
var readFile = function (fileName){
    return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
            if (error) reject(error);
            resolve(data);
        });
    });
};

//抓取网页改写的promise对象
var agentUrl = function (url, fileText) {
    return new Promise(function (resolve, reject){
        superagent.get(url).end( function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
};


function* readConfig() {
    let commonConfigText = yield readFile('../config/config_dev.js');
    let dbConfigText = yield readFile('../config/database.js');
    let webContent = yield agentUrl(commonConfig.seedUrl, commonConfigText);
    return {
        commonConfigText: commonConfigText,
        dbConfigText: dbConfigText,
        webContent: webContent
    }
}

//var config = readConfig(); //得到Generator函数
co(readConfig).then(function(result) {
    console.log(result);
}, function (err) {
    console.error(err.stack);
});
