/**
 * Created by littest on 14/12/24.
 */
var url  = require("url"),
    path = require("path"),
    fs   = require("fs");

exports.visitRes = function(resquest,response){

    var pathname=__dirname+url.parse(resquest.url).pathname;

    if (path.extname(pathname)=="") {
        pathname=__dirname + "/";
    }
    if (pathname.charAt(pathname.length-1)=="/"){
        pathname+="index.html";
    }

    fs.exists(pathname,function(exists){
        if(exists){
            switch(path.extname(pathname)){
                case ".html":
                    response.writeHead(200, {"Content-Type": "text/html"});
                    break;
                case ".js":
                    response.writeHead(200, {"Content-Type": "text/javascript"});
                    break;
                case ".css":
                    response.writeHead(200, {"Content-Type": "text/css"});
                    break;
                case ".gif":
                    response.writeHead(200, {"Content-Type": "image/gif"});
                    break;
                case ".jpg":
                    response.writeHead(200, {"Content-Type": "image/jpeg"});
                    break;
                case ".png":
                    response.writeHead(200, {"Content-Type": "image/png"});
                    break;
                default:
                    response.writeHead(200, {"Content-Type": "application/octet-stream"});
            }
            console.log(pathname);
            fs.readFile(pathname,function (err,data){
                response.write(data, "binary");
                response.end();
            });
        } else {
            console.log("No request handler found for " + pathname);
            response.writeHead(404, {"Content-Type": "text/html;charset=UTF-8"});
            response.end("<h1>404 Not Found</h1>");
        }
    });
}