/**
 * Created by littest on 15/1/12.
 */
var mongoose = require('mongoose');
var publictool = require('../publicTool/publicTools');

var apppushdb  = require('./apppush/apppushdb');

exports.creatdb = function(){
    var strurl = 'mongodb://' + publictool.releaseip + ':27017/apppush';
    var mongodb = mongoose.connect(strurl);

    var db = mongodb.connection;

    db.on('error',console.error.bind(console,'connection erro:'));
    db.once('open',function callback(){
        console.log('db is open success!');

        apppushdb.createmydb();

        initdb();
    });
}

function initdb(){
    apppushdb.init();
}