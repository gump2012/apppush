/**
 * Created by littest on 15/1/12.
 */

var config = require('../config/config');
var pushdb = require('../db/apppush/apppushdb');
var sendhandle = require('../sendHandle/sendHandles');

var timeout;

exports.startSend = function(){
    timeout = setInterval(resend,config.resendTime);
}

function resend(){
    console.log('resend');
    console.log('messagearr  '+pushdb.messagearr.length);
    console.log('temparr ' + pushdb.temparr.length);
    for(var i = 0;i < pushdb.messagearr.length;++i){
        resendOne(pushdb.messagearr[i]);
    }

    if(pushdb.temparr.length > 0){
        for(var i = 0; i < pushdb.temparr.length;++i){
            pushdb.messagearr.push(pushdb.temparr[i]);
        }

        pushdb.temparr = [];
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
