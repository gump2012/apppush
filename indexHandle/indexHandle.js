/**
 * Created by gump on 11/17/14.
 */
var fs   = require("fs");

exports.start = function (response,request){
    fs.exists('/index.html',function(exists){
        if(exists){
            response.writeHead(200, {"Content-Type": "text/html"});
            fs.readFile('/index.html',function (err,data){
                response.write(data, "binary");
                response.end();
            });
        } else {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.end("<h1>404 Not Found</h1>");
        }
    });
}