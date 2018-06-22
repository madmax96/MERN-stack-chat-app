
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
  const findMessagesInChatPromise = Message.find({ chatId: data.chatId });
  const MessageObj = new Message(message);

  const messageSavingPromise = MessageObj.save();


  const userUpdatePromise = User.findByIdAndUpdate(user._id, {
    $push: {
      ChatRooms: { chatId: data.chatId },
    },
  }, { new: true });

  const chatUpdatePromise = ChatRoom.findByIdAndUpdate(data.chatId, {
    $push: {
      users: { userId: user._id, userName: user.name },
    },
  }, { new: false });
  Promise.all([userUpdatePromise, chatUpdatePromise,
    messageSavingPromise, findMessagesInChatPromise])
    .then((results) => {
      const message = results[2];
      const messageObject = message.toObject();
      messageObject.time = message._id.getTimestamp();
      messageObject.user = {
        id: user._id,
        name: user.name,
      };
      let currentMessages = results[3];

      currentMessages = currentMessages.map((message) => {
        const { __v, chatId, ...messageData } = message.toObject();
        messageData.time = message._id.getTimestamp().toString();
        return messageData;
      });
      currentMessages.pop();
      const currentUsers = results[1].toObject().users;
      clientSocket.send(JSON.stringify({
        event: 'joinedChatData',
        data: { currentMessages, currentUsers, chatId: data.chatId },
      }));

      if (wss.chatRooms[data.chatId]) {
        wss.chatRooms[data.chatId].push(clientSocket);
      } else {
        wss.chatRooms[data.chatId] = [clientSocket];
      }
      wss.sendMessageToRoom(messageObject.chatId, messageObject, 'userJoinedChat');
    }).catch((e) => {
      console.log(e.message);
    });
};
