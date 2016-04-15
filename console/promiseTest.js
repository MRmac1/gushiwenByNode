/**
 * Created by mr_mac1 on 16/4/14.
 */
import 'babel-polyfill';
var fs = require('fs');
var readFile = function (fileName){
    return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
            if (error) reject(error);
            resolve(data);
        });
    });
};
var sequence = Promise.resolve();
var pages = 3;
//for ( let page = 1; page <= pages.toString(); page++ ) {
//    let path = '../config/t' + page;
//    sequence = sequence.then(function() {
//        return readFile(path);
//    }).then(console.log);
//}
var pagesArr = []
for (var i = 1; i <= pages; i++ ) {
    pagesArr.push(i);
}

