/**
 * Created by littest on 15/1/12.
 */

exports.createdb = function (mongoose){
    var schema = new mongoose.Schema({
        mid     :{
            type: String,
            unique: true
        }
        ,phone              :String
        ,message            :String
        ,state              :Number
        ,device             :String
    });

    mongoose.model('pushmessage',schema);
}

var message = [];
exports.messagearr = message;

exports.initdb = function(mongoose){
    var messagemodel = mongoose.model('pushmessage');
    if(messagemodel){
        messagemodel.find({},function(err,docs){
            for(var i = 0; i < docs.length;++i){
                message.push(docs[i]);
            }
        });
    }
}

exports.save = function(msg){

}

exports.delete = function(msg){

}