/**
 * Created by mr_mac1 on 16/4/14.
 */
import 'babel-polyfill';


const [co, fs, thunkify] = [require('co'), require('fs'), require('thunkify')];
var readFile = thunkify(fs.readFile);

//改写fs.readFile为promise返回对象
//var readFile = function (fileName){
//    return new Promise(function (resolve, reject){
//        fs.readFile(fileName, function(error, data){
//            if (error) reject(error);
//            resolve(data);
//        });
//    });
//};

var sequence = Promise.resolve();//可以返回一个Promise序列
co( function* () {
    let pages = yield readFile('../config/pages');  //读取pages文件
    for ( let page = 1; page <= pages.toString(); page++ ) {
        let path = '../config/t' + page;
        console.log(path);
        sequence = sequence.then(function() {
            return readFile(path);
        }).then(function(file) {
            console.log(file);
        });
    }
});
