var Template = require("./TransmissionTemplate");

var fs = require('fs')
var p = require('node-protobuf').Protobuf
var pb = new p(fs.readFileSync('/root/apppush/NodeProj/GtReq.desc'))

var request = require('request');

// Change to your own app's infos
var APPID  = "sMgsNRPWgB6jjEvF52O7C8";
var APPKEY = "GyfzBulXAd6J6QDzed8er";
var MASTERSECRET = "YF7f1TEBRk9YX44sJJW7s9"
var URL = "http://sdk.open.api.igexin.com/apiex.htm"

// Create TransmissionTemplate
var template = new Template.TransmissionTemplate();
template.appId = APPID;
template.appKey = APPKEY;
template.type = 2;

var transparent = template.getTransparent();
//console.log(transparent);

var base64str = new Buffer(pb.Serialize(transparent, "protobuf.Transparent")).toString('base64');
//console.log(base64str);

var obj = pb.Parse(new Buffer(base64str, "base64"), "protobuf.Transparent");
//console.log(obj);



// If you get "sign_error", try this request to get authed first!
function auth(){
	var timeStamp = new Date().getTime();
	var sign = md5(APPKEY + timeStamp + MASTERSECRET);	
	request.post(
			URL,
			{ json:{
			"action": "connect",
			"appkey": APPKEY,
			"timeStamp": timeStamp,
			"sign": sign,
			"version":"3.0.0.0"
			} },
			function (error, response, body) {
			if (!error && response.statusCode == 200) {
			console.log(body)
			}
			}
		    );
};

//cal MD5
var crypto = require('crypto');
function md5(text) {
	return crypto.createHash('md5').update(text).digest('hex');
};

function pushMessageToSingle(deviceid,message){
	request.post(
			URL,
			{ json:{
			"action": "pushMessageToSingleAction",
			"appkey": APPKEY,
			"clientData": base64str,
			"transmissionContent": message,
			"isOffline": "false",
			"offlineExpireTime": 0,
			"appId": APPID,
			"pushType": "pushTransmissionMsg",
			"version":"3.0.0.0",
			"clientId": deviceid,
			"type": template.type 
			} },
			function (error, response, body) {
			if (!error && response.statusCode == 200) {
			console.log(body)
				console.log(message);
				console.log(deviceid);
			}
			}
		    );
};


exports.androidpush = function(deviceid,message){
var startTime = new Date().getTime();
auth();
pushMessageToSingle(deviceid,message);
var endTime = new Date().getTime();
console.log("time used: "+ (endTime-startTime) + " ms");
}

