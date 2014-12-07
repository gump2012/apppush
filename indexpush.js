/**
 * Created by gump on 11/17/14.
 */
var server = require("./server");
var router = require("./router");
var index = require("./indexHandle/indexHandle");
var androidpush = require("./NodeProj/androidpush.js");

var apn = require('apn');

var handle = {};
handle["/"] = index.start;

server.start(router.route,handle);

var options = {cert:'/root/apppush/certificate/cert.pem',key:'/root/apppush/certificate/key.pem'};

var apnConnection = new apn.Connection(options);
var myDevice = new apn.Device('9f07dad7aee6e3f13fbaa645c4d9e67e4fbcc2b1d08d25cd15910716460946f2');
var note = new apn.Notification();

//note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 1;
note.sound = "";
note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
note.payload = {'messageFrom': 'Caroline'};

apnConnection.pushNotification(note, myDevice);

androidpush.androidpush();