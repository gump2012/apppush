/**
 * Created by gump on 11/17/14.
 */
var server = require("./server");
var router = require("./router");
var index = require("./indexHandle/indexHandle");

var handle = {};
handle["/"] = index.start;

server.start(router.route,handle);