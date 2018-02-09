const mongoose = require('mongoose');


let ChatRoomSchema = new mongoose.Schema({

    creator:{
        required:true,
        type:mongoose.Schema.Types.ObjectId
    },
    isActive:{
        type:Boolean,
        default:true
    },
    group:{
        required:true,
        type:String,
        enum:['Sport','Celebrity','Politics','Movies','Songs']
    },
    title:{
        type:String,
        required:true,
        minlength:10,
        maxlength:30
    },
    maxNumOfUsers:{
        type:Number,
        min:2,
        max:8
    },
    users:[{
        user:{
            required:false,
            type:mongoose.Schema.Types.ObjectId
        }
    }],
    messages:[{
        message:{
            type:mongoose.Schema.Types.ObjectId,
            required:false
        }
    }]

});
let ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);

module.exports = ChatRoom; 