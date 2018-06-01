/*
Receive
{
    group:String,
    title:String,
    maxNumOfUsers:Number
}
Send
{
    group:String,
    title:String,
    maxNumOfUsers:Number
    chatId:ObjectId
    creator:{
        id:ObjectId,
        name:String
    }
}
*/
const ChatRoom = require('./../models/ChatRoom');
const User = require('./../models/User');

module.exports = (data, clientSocket, wss) => {
  const { user } = clientSocket;

  data.creator = user._id;
  data.users = [{
    userId: user._id,
    userName: user.name,
  }];
  const newChatRoom = new ChatRoom(data);
  newChatRoom.save().then((chatData) => {
    User.findByIdAndUpdate(data.creator, {
      $push: {
        ChatRooms: { chatId: chatData._id },
      },
    }, { new: true }).then(() => {
      data.chatId = chatData._id;
      data.creator = { id: data.creator, name: user.name };
      // add author of chat to global chatRooms
      wss.chatRooms[data.chatId] = [clientSocket];

      // send notif to everyone subscribed to group
      wss.sendNotifToSubscriptionGroup(data.group, data, clientSocket);
    }).catch((e) => {
      console.log(e.message);
    });
  });
};
