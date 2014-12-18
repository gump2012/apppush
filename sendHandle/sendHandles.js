/**
 * Created by gump on 12/8/14.
 */
var publicTool = require('../publicTool/publicTools');
var iossend = require('./iossend');
var androidsend = require('./androidsend');

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
                datajson = JSON.parse(requestData);
                if(datajson){
                    if(datajson.deviceSysType === 'ios'){
                        iossend.iossend(datajson,response);
                    }
                    else if(datajson.deviceSysType === 'android'){
                        androidsend.androidpush(datajson,response);
                    }
                    else{
                        publicTool.returnErr(response,'没找到设备');
                    }
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
