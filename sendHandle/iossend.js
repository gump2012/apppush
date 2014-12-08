/**
 * Created by gump on 12/8/14.
 */
var publicTool = require('../publicTool/publicTools');
var apn = require('apn');

exports.iossend = function (datajson,response){
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
    var options = {cert:'/root/apppush/certificate/cert.pem',key:'/root/apppush/certificate/key.pem'};

    var apnConnection = new apn.Connection(options);
    var myDevice = new apn.Device(deviceid);
    var note = new apn.Notification();

//note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 1;
    note.sound = "";
    note.alert = message;
    note.payload = {'messageFrom': 'Caroline'};

    apnConnection.pushNotification(note, myDevice);
}