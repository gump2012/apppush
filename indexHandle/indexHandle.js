/**
 * Created by gump on 11/17/14.
 */
var fs   = require("fs");

exports.start = function (response,request){
    fs.exists('/root/apppush/index.html',function(exists){
        console.log(exists);
        console.log('ri');
        if(exists){
            response.writeHead(200, {"Content-Type": "text/html"});
            fs.readFile('/root/apppush/index.html',function (err,data){
                response.write(data, "binary");
                response.end();
            });
        } else {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.end("<h1>404 Not Found</h1>");
        }
    });
}
