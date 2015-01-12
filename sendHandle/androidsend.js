/**
 * Created by gump on 12/8/14.
 */
var publicTool = require('../publicTool/publicTools');
var androidpush = require("../NodeProj/androidpush.js");
var querystring = require("querystring");
var jpush = require("./JPush/androidJPush");

exports.androidpush = function (datajson,response){
    var message = querystring.parse(datajson).message;
    console.log('message :' + message);
    if(message){
        var useridarr = querystring.parse(datajson).userid;
        var uarr = eval(useridarr);
        if(uarr && uarr.length > 0){
            for(var i = 0; i < uarr.length; ++i){
                var deviceid = uarr[i];
                sendonepush(deviceid,message);
            }

            publicTool.returnOK(response,'');
        }
        else{
            publicTool.returnErr(response,'没有用户id');
        }
    }
    else{
        publicTool.returnErr(response,'没有发送内容');
    }
}

function sendonepush(deviceid,message){
   // androidpush.androidpush(deviceid,message);
    jpush.androidJPush(deviceid,message);
}

exports.sendOne = sendonepush;