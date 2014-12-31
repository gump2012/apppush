/**
 * Created by littest on 14/12/26.
 */
var JPush = require("./JPush.js");
var client = JPush.buildClient('239a318dc803cf7a6f96e50c', 'da3e8c98f99f8375fbf31d37');

exports.androidJPush = function(deviceid,message){
    client.push().setPlatform('android')
        .setAudience(JPush.registration_id(deviceid))
        .setNotification('通知',JPush.android(message, null, 1))
        .setMessage(message)
        .setOptions(null, 60)
        .send(function(err, res) {
            if (err) {
                if (err instanceof JPush.APIConnectionError) {
                    console.log(err.message);
                    console.log(err.isResponseTimeout);
                } else if (err instanceof  JPush.APIRequestError) {
                    console.log(err.message);
                }
            } else {
                console.log('Sendno: ' + res.sendno);
                console.log('Msg_id: ' + res.msg_id);
            }
        });
}