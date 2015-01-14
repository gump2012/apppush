/**
 * Created by littest on 15/1/12.
 */

var mongoose = require('mongoose');

exports.createmydb = function (){
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
var temp = [];
exports.temparr = temp;

exports.init = function(){
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
    var messagemodel = mongoose.model('pushmessage');
    if(messagemodel){
        messagemodel.findOne({mid:msg.mid},function(err,doc){
            if(!doc){
                var messageEntity = new messagemodel(msg);
                messageEntity.save(function( err, silence ) {
                    if( err )
                    {
                        console.log(err);
                    }else{
                        temp.push(msg);
                    }
                });
            }
        });
    }
}

exports.delete = function(msg){
    var messagemodel = mongoose.model('pushmessage');
    if(messagemodel){
        messagemodel.findOne({mid:msg.mid},function(err,doc){
            if(doc){
                messagemodel.remove({_id:doc._id},function(err){
                    if(err){
                        console.log("remove err  " + err);
                    }else{
                        removeFromArr(msg);
                    }
                });
            }
        });
    }
}

function removeFromArr(msg){
    for(var i = 0 ; i < temp.length;++i){
        if(temp[i].mid == msg.mid){
            temp.splice(i,1);
            break;
        }
    }

    for(var i = 0 ; i < message.length;++i){
        if(message[i].mid == msg.mid){
            message.splice(i,1);
            break;
        }
    }
}