/**
 * Created by gump on 12/8/14.
 */
exports.releaseip = 'www.kkk885.cn';
exports.localip = '127.0.0.1';

exports.returnErr = function (response,errstr){
    var responsevalue = {
        response_status:'error',
        msg:errstr
    }
    var postData = JSON.stringify(responsevalue);
    response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
    response.write(postData);
    response.end();
}

exports.returnOK = function (response,errstr){
    var responsevalue = {
        response_status:'ok',
        msg:errstr
    }
    var postData = JSON.stringify(responsevalue);
    response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
    response.write(postData);
    response.end();
}