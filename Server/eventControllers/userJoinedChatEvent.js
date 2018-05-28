
/*


Receive{
    chatId:ObjectId,
}

broadcast{
    text:String,
    time:timestamp,
    creator:ObjectId
    chatId:ObjectId
    _id:ObjectId
    user:{
      userId:ObjectId,
      name:String
    }
}
*/

const ChatRoom = require('./../models/ChatRoom');
const User = require('./../models/User');
const Message = require('./../models/Message');
const { ObjectID } = require('mongodb');

module.exports = (data, clientSocket, wss) => {
  const { user } = clientSocket;
  data.user = { id: user._id, name: user.name };
  const message = {
    creator: new ObjectID('000000000000000000000000'), // Object Id for message from admin
    chatId: data.chatId,
    text: `User ${user.name} joined chat`,
  };
  const MessageObj = new Message(message);

  const messageSavingPromise = MessageObj.save();

  const userUpdatePromise = User.findByIdAndUpdate(user._id, {
    $push: {
      ChatRooms: { chatId: data.chatId, isCreator: false },
    },
  }, { new: true });

  const chatUpdatePromise = ChatRoom.findByIdAndUpdate(data.chatId, {
    $push: {
      users: { userId: user._id },
    },
  }, { new: true });

  Promise.all([userUpdatePromise, chatUpdatePromise, messageSavingPromise]).then((results) => {
    const message = results[2];
    const messageObject = message.toObject();
    messageObject.time = message._id.getTimestamp();
    messageObject.user = {
      id: user._id,
      name: user.name,
    };
    if (wss.chatRooms[data.chatId]) {
      wss.chatRooms[data.chatId].push(clientSocket);
    } else {
      wss.chatRooms[data.chatId] = [clientSocket];
    }
    wss.sendAdminMessageToRoom(messageObject.chatId, messageObject, 'userJoinedChat');
  }).catch((e) => {
    console.log(e.message);
  });
};
