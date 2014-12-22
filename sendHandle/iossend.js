/**
 * Created by gump on 12/8/14.
 */
var publicTool = require('../publicTool/publicTools');
var apn = require('apn');
var querystring = require("querystring");

exports.iossend = function (datajson,response){
    var message = querystring.parse(datajson).message
    if(message){
        var useridarr = querystring.parse(datajson).userid;
        var uarr = eval(useridarr);
        if(uarr &&
            uarr.length > 0){
            for(var i = 0; i < uarr.length; ++i){
                var deviceid = uarr[i];
                if(deviceid){
                console.log('deviceid is '+deviceid);
                sendonepush(deviceid,message);
                }
                else{
                    publicTool.returnErr(response,'用户id为空');
                    break;
                }
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
    try{
    apnConnection.pushNotification(note, myDevice);
}
catch(e){
console.log(e.description);
}

    console.log('send message'+deviceid+':'+message);
}
