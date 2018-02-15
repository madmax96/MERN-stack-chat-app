/*


Receive{
    text:String,
    chatId:ObjectId
}

broadcast{
    text:String,
    time:timestamp,
    creator:ObjectId
    chatId:ObjectId
}
*/


const ChatRoom = require('./../models/ChatRoom');
const Message = require('./../models/Message');
module.exports = (data,ws,wss)=>{
    
    console.log(data);

    // WebsocketServer.broadcast.toChat('chatId',dataToSend);

    //wss.broadcast.toChat(chatId)
}