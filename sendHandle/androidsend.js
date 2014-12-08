/**
 * Created by gump on 12/8/14.
 */
var publicTool = require('../publicTool/publicTools');
var androidpush = require("../NodeProj/androidpush.js");

exports.androidpush = function (datajson,response){
    if(datajson.message){
        if(datajson.userid && datajson.userid.length > 0){
            for(var i = 0; i < datajson.userid.length; ++i){
                var deviceid = datajson.userid[i];
                sendonepush(deviceid,datajson.message);
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
    androidpush.androidpush(deviceid,message);
}