/*


Receive{
    text:String,
    chat:ObjectId
}

broadcast{
    text:String,
    time:timestamp,
    creator:ObjectId
    chat:ObjectId
}
*/


const ChatRoom = require('./../models/ChatRoom');
const Message = require('./../models/Message');
module.exports = (data,clientSocket,wss)=>{
    
    console.log('ses', data);
    data.creator = clientSocket.user._id;
    const newMessage = new Message(data);
    newMessage.save().then((message)=>{
        message.time = message._id.getTimestamp();
        wss.sendMessageToRoom(data.chat,message);
    }).catch((e)=>{
        console.log(e);
    });

}