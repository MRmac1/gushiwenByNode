/**
 * Created by mr_mac1 on 16/4/14.
 */
//import 'babel-polyfill';
var co = require('co');

co(function* (){
    var now = Date.now();
    yield sleep(500);
    console.log(Date.now() - now);
});

function sleep(ms) {
    return function(cb) {
        setTimeout(cb, ms);
    }
}
