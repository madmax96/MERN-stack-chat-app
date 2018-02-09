const ChatRoom = require('./../models/ChatRoom');
const Message = require('./../models/Message');
module.exports = (data,ws,wss)=>{
    console.log('user message handler',data);
    condition={
        chatId:'asdasd'
    }
    // ChatRoom.newMessage(data);
    // Message.insertMessage(data);
    wss.broadcast('newMessage',data,ws,condition);
}