/**
 * Created by littest on 15/1/12.
 */

var config = require('../config/config');
var pushdb = require('../db/paapush/apppushdb');
var sendhandle = require('../sendHandle/sendHandles');

var timeout;

exports.startSend = function(){
    timeout = setInterval(resend,config.resendTime);
}

function resend(){
    for(var i = 0;i < pushdb.messagearr.length;++i){
        resendOne(pushdb.messagearr[i]);
    }
}

function stopSend(){
    clearInterval(timeout);
}

function resendOne(msg){
    if(msg.state === 0){
        sendhandle.sendOnePush(msg);
    }
}

exports.stopSend = stopSend;