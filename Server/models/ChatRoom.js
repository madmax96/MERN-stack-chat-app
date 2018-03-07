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
        maxlength:50
    },
    maxNumOfUsers:{
        type:Number,
        min:2,
        max:8
    },
    users:[{
        userId:{
            required:false,
            type:mongoose.Schema.Types.ObjectId
        },
        lastMessageSeen:{
            required:false,
            type:mongoose.Schema.Types.ObjectId
        }
    }]
});
let ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);

module.exports = ChatRoom; 