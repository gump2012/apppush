/**
 * Created by gump on 11/17/14.
 */
var http = require("http");
var url = require("url");
exports.start = function (route,handle){
    function onRequest(request,response){
        var pathname = url.parse(request.url).pathname;
        route(handle,pathname,response,request);
    }

    http.createServer(onRequest).listen(80);
    console.log("server has started");
}