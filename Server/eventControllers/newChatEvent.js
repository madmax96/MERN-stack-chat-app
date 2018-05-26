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
const User = require('./../models/User');

module.exports = (data, clientSocket, wss) => {
  const { user } = clientSocket;

  data.creator = user._id;
  const newChatRoom = new ChatRoom(data);
  newChatRoom.save().then((chatData) => {
    console.log('creator is ',data.creator);
    User.findByIdAndUpdate(data.creator,{
        "$push":{
          "ChatRooms":{"chatId":chatData._id,"isCreator":true}
        }
        },{"new":true}).then((updatedUser)=>{
      data.chatId = chatData._id;
      data.creator = { id: data.creator, name: user.name };
      // send notif to everyone subscribed to group
      wss.sendNotifToSubscriptionGroup(data.group, data, clientSocket);

    }).catch((e) => {
    console.log(e.message);
  })
})
};
