/**
 * Created by gump on 12/8/14.
 */
var publicTool = require('../publicTool/publicTools');
var androidpush = require("../NodeProj/androidpush.js");
var querystring = require("querystring");
var jpush = require("./JPush/androidJPush");
var apppushdb = require('../db/apppush/apppushdb');

exports.androidpush = function (datajson,response){
    var message = querystring.parse(datajson).message;
    var mid = querystring.parse(datajson).msgid;
    console.log('message :' + message);
    if(message){
        var useridarr = querystring.parse(datajson).userid;
        var uarr = eval(useridarr);
        if(uarr && uarr.length > 0){
            for(var i = 0; i < uarr.length; ++i){
                var deviceid = uarr[i];
                var isnull = false;
                if(deviceid){
                var msg = {
                    mid     :mid
                    ,phone              :deviceid
                    ,message            :message
                    ,state              :0
                    ,device             :'android'
                }
                //apppushdb.save(msg);
                sendonepush(deviceid,message);
                }else{
                    publicTool.returnErr(response,'用户id为空');
                    isnull = true;
                    break;
                }
            }

            if(!isnull){
                publicTool.returnOK(response,'');
            }
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