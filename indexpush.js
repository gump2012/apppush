/**
 * Created by gump on 11/17/14.
 */
var server = require("./server");
var router = require("./router");
var index = require("./indexHandle/indexHandle");
var sendpush = require('./sendHandle/sendHandles');

var handle = {};
handle["/"] = index.start;
handle['/send'] = sendpush.sendpush;

server.start(router.route,handle);