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

const { ObjectID } = require('mongodb');
const ChatRoom = require('./../models/ChatRoom');

module.exports = (data, clientSocket, wss) => {
  const { user } = clientSocket;

  data.creator = user._id;
  const newChatRoom = new ChatRoom(data);
  newChatRoom.save().then((chatData) => {
    data.creator = { id: data.creator, name: user.name };
    data.chatId = chatData._id;

    // send notif to everyone subscribed to group
    wss.sendNotifToSubscriptionGroup(data.group, data, clientSocket);
  }).catch((e) => {
    console.log(e);
  });
};
