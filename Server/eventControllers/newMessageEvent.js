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
    _id:ObjectId
}
*/
const Message = require('./../models/Message');

module.exports = (data, clientSocket, wss) => {
  data.creator = clientSocket.user._id;
  const newMessage = new Message(data);
  newMessage.save().then((message) => {
    const messageObject = message.toObject();
    messageObject.time = message._id.getTimestamp();
    wss.sendMessageToRoom(data.chatId, messageObject, 'newMessage');
  }).catch((e) => {
    console.log(e);
  });
};
