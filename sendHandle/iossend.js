/**
 * Created by gump on 12/8/14.
 */
var publicTool = require('../publicTool/publicTools');
var apn = require('apn');
var querystring = require("querystring");
var apppushdb = require('../db/apppush/apppushdb');
var bFeedback = false;

exports.iossend = function (datajson,response){
    var message = querystring.parse(datajson).message;
    var sound = querystring.parse(datajson).sound;
    var mid = querystring.parse(datajson).msgid;
    if(message && mid){
        var useridarr = querystring.parse(datajson).userid;
        var uarr = eval(useridarr);

        if(uarr && uarr.length > 0){

            var isnull = false;
            for(var i = 0; i < uarr.length; ++i){
                var deviceid = uarr[i];
                if(deviceid){
                console.log('deviceid is '+deviceid);
                var msg = {
                    mid     :mid
                    ,phone              :deviceid
                    ,message            :message
                    ,state              :0
                    ,device             :'ios'
                }
                apppushdb.save(msg);
                sendonepush(deviceid,message,sound,mid);
                    if(!bFeedback){
                        beginFeedback();
                        bFeedback = true;
                    }
                }
                else{
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

function sendonepush(deviceid,message,sound,mid){
    var options = {cert:'/root/apppush/certificate/cert.pem',key:'/root/apppush/certificate/key.pem',passphrase:'1111'};

    var apnConnection = new apn.Connection(options);
    var myDevice = new apn.Device(deviceid);
    var note = new apn.Notification();

//note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 1;
    if(sound){
        note.sound = sound;
    }
    note.sound = "ringing.m4a";
    note.alert = message;
    note.payload = {'messageFrom': 'Caroline','mid':mid};
    try{
    apnConnection.pushNotification(note, myDevice);
}
catch(e){
console.log(e.description);
}

    console.log('send message'+deviceid+':'+message);
}

function beginFeedback(){
    var options = {
        "batchFeedback": true,
        "interval": 300
    };

    var feedback = new apn.Feedback(options);
    feedback.on("feedback", function(devices) {
        devices.forEach(function(item) {
            console.log(item.device,item.time);
        });
    });
}

exports.sendOne = sendonepush;
