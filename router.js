/**
 * Created by gump on 11/17/14.
 */
var res = require("./res/res");

exports.route = function (handle,pathname,response,request){
    request.setEncoding('utf8');
    console.log(request.url);
    console.log(pathname);
    if(typeof handle[pathname] === 'function'){
        handle[pathname](response,request);
    }else{
        res.visitRes(request,response);
    }
}
