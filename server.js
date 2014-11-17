/**
 * Created by gump on 11/17/14.
 */
var http = require("http");

exports.start = function (route,handle){
    function onRequest(request,response){
        route(handle,request.url,response,request);
    }

    http.createServer(onRequest).listen(80);
    console.log("server has started");
}