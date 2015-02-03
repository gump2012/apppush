/**
 * Created by gump on 12/8/14.
 */
var publicTool = require('../publicTool/publicTools');
var androidpush = require("../NodeProj/androidpush.js");
var querystring = require("querystring");
var jpush = require("./JPush/androidJPush");
var apppushdb = require('../db/apppush/apppushdb');

exports.androidpush = function (datajson,response,timeout){
    var message = querystring.parse(datajson).message;
    var mid = querystring.parse(datajson).msgid;
    var addressor = querystring.parse(datajson).addressor;
    var rank = querystring.parse(datajson).rank;
    var truncate = querystring.parse(datajson).truncate;
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
                    ,addressor          :addressor
                    ,rank               :new Number(rank)
                    ,truncate           :new Number(truncate)
                }
                //apppushdb.save(msg);
                sendonepush(deviceid,msg);
                }else{
                    clearTimeout(timeout);
                    publicTool.returnErr(response,'用户id为空');
                    isnull = true;
                    break;
                }
            }

            if(!isnull){
                clearTimeout(timeout);
                publicTool.returnOK(response,'');
            }
        }
        else{
            clearTimeout(timeout);
            publicTool.returnErr(response,'没有用户id');
        }
    }
    else{
        clearTimeout(timeout);
        publicTool.returnErr(response,'没有发送内容');
    }
}

function sendonepush(deviceid,msg){
   // androidpush.androidpush(deviceid,message);

    jpush.androidJPush(deviceid,msg);
}

exports.sendOne = sendonepush;