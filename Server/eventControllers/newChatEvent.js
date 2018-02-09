/*


Receive{
    group:String,
    title:String,
    maxNumOfUsers:Number
}
broadcast{
    group:String,
    title:String,
    maxNumOfUsers:Number
    chatId:ObjectId
    admin:User
}

*/


const ChatRoom = require('./../models/ChatRoom');
const Message = require('./../models/Message');
module.exports = (data,ws,wss)=>{
    
    
}