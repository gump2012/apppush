/**
 * Created by gump on 12/8/14.
 */
var publicTool = require('../publicTool/publicTools');
var iossend = require('./iossend');
var androidsend = require('./androidsend');
var querystring = require("querystring");

exports.sendpush = function (response,request){
    var requestData = '';

    var response_timer = setTimeout(function() {
        publicTool.returnErr(response,'超时了');
        request.destroy();
        console.log('Response Timeout.');
    }, 20000);

    request.addListener('data', function(postDataChunk) {
        requestData += postDataChunk;
    });

    request.addListener('end', function() {
        console.log(requestData);
        if(requestData){
            var datajson;
            try {
                var devicetype = querystring.parse(requestData).deviceSysType;
                if(devicetype){
                    if(devicetype === 'ios'){
                        iossend.iossend(requestData,response,response_timer);
                    }
                    else if(devicetype === 'android'){
                        androidsend.androidpush(requestData,response,response_timer);
                    }
                    else{
                        clearTimeout(response_timer);
                        publicTool.returnErr(response,'没找到设备');
                    }
                }
                else{
                    clearTimeout(response_timer);
                    publicTool.returnErr(response,'没有设备类型');
                }
            } catch (e) {
                // An error has occured, handle it, by e.g. logging it
		console.log('ri');
                console.log(e);
            }
        }else{
            clearTimeout(response_timer);
            publicTool.returnErr(response,'没有post数据');
        }
    });
}

exports.sendOnePush = function(msg){
    if(msg.device === 'ios'){
        iossend.sendOne(msg.phone,msg.message,'',msg.mid);
    }else if(msg.device === 'android'){
        androidsend.sendOne(msg.phone,msg.message);
    }
}
