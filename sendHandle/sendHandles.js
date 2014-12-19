/**
 * Created by gump on 12/8/14.
 */
var publicTool = require('../publicTool/publicTools');
var iossend = require('./iossend');
var androidsend = require('./androidsend');
var querystring = require("querystring");

exports.sendpush = function (response,request){
    var requestData = '';
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
                        iossend.iossend(requestData,response);
                    }
                    else if(devicetype === 'android'){
                        androidsend.androidpush(requestData,response);
                    }
                    else{
                        publicTool.returnErr(response,'没找到设备');
                    }
                }
                else{
                    publicTool.returnErr(response,'没有设备类型');
                }
            } catch (e) {
                // An error has occured, handle it, by e.g. logging it
		console.log('ri');
                console.log(e);
            }
        }else{
            publicTool.returnErr(response,'没有post数据');
        }
    });
}
