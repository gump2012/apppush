/**
 * Created by littest on 15/1/12.
 */
var url = require("url");
var querystring = require("querystring");
var pushdb = require('../db/apppush/apppushdb');
var publictoos = require('../publicTool/publicTools');

exports.receiveMsg = function (response,request){
    var arg = url.parse(request.url).query;
    var mid = querystring.parse(arg).mid;
    var phone = querystring.parse(arg).phone;
    var message = querystring.parse(arg).message;
    var state = querystring.parse(arg).state;

    var msg = {
        mid:mid
        ,phone:phone
        ,message:message
        ,state:state
    }

    pushdb.delete(msg);

    publictoos.returnOK(response,'ok');
}