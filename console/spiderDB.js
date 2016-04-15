/**
 * Created by mr_mac1 on 16/4/15.
 */
/**
 * 爬取古诗文网站 存入数据库函数
 * 2016年04月13日19:06:20
 */
import 'babel-polyfill';
const [mysql, databaseConfig] = [require('mysql'),require('../config/database')];
var connection = mysql.createConnection({
    host     : databaseConfig.host,
    user     : databaseConfig.user,
    password : databaseConfig.password,
    database : databaseConfig.db
});
connection.connect();

connection.on('error', function(err) {
    console.log(err.code); // 'ER_BAD_DB_ERROR'
});

exports.addResult = function( result ) {
    console.log('正在添加' + result.title);
    let now = getCurrentDate();
    connection.query('INSERT INTO gushiwen SET ?', {result:JSON.stringify(result), created_at: now, updated_at:now} , function(err, result) {
        if (err) throw err;
        console.log('添加成功, id为' + result.insertId);
    });
};


//获取当前时间,日期,时分秒展示 2009-06-12 12:00
var getCurrentDate = function() {
    let now = new Date();
    let [year, month, day, hh, mm, ss] = [now.getFullYear(),
        now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];
    var clock = year + "-";
    if(month < 10)
        clock += "0";
    clock += month + "-";
    if(day < 10)
        clock += "0";
    clock += day + " ";
    if(hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ':';
    if (ss < 10) clock += '0';
    clock += ss;
    return clock;
};
