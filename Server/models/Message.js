const mongoose = require('mongoose');


let MessageSchema = new mongoose.Schema({

    creator:{
        required:true,
        type:mongoose.Schema.Types.ObjectId
    },
    chat:{
        required:true,
        type:mongoose.Schema.Types.ObjectId
    },
    date:{
        required:true,
        type:Number
    },
    text:{
        required:true,
        type:String,
        trim: true
    }
});

let Message = mongoose.model('Message', MessageSchema);

module.exports = Message;