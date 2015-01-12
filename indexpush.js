/**
 * Created by gump on 11/17/14.
 */
var server = require("./server");
var router = require("./router");
var index = require("./indexHandle/indexHandle");
var sendpush = require('./sendHandle/sendHandles');
var db = require('./db/pushdb');
var receiveMsg = require('./receiveMsgHandle/receiveMsgHandle');

var handle = {};
handle["/"] = index.start;
handle['/send'] = sendpush.sendpush;
handle['/receivemsg'] = receiveMsg.receiveMsg;

server.start(router.route,handle);
db.creatdb();