
/*
Receive{
    groupName:String,
    subscribe:Boolean
}
broadcast{
}
*/
const User = require('./../models/User');
const ChatRoom = require('./../models/ChatRoom');

module.exports = (data, clientSocket) => {
  const { user } = clientSocket;
  const { groupName } = data;

  let updatePromise;
  if (data.subscribe) {
    updatePromise = User.findByIdAndUpdate(user._id, {
      $push: {
        subscribedTo: groupName,
      },
    }, { new: true });
    const userChats = clientSocket.user.ChatRooms.map(chat => chat.chatId);
    const chatsPromise = ChatRoom.find({ group: groupName, _id: { $nin: userChats } });
    Promise.all([chatsPromise, updatePromise]).then((results) => {
      let [chats] = results;

      chats = chats.map((chat) => {
        chat = chat.toObject();
        const { __v, users, ...chatData } = chat;

        const [creator] = users
          .filter(user => user.userId.toHexString() === chat.creator.toHexString());

        const { _id, ...creatorData } = creator;
        chatData.creator = creatorData;
        chatData.createdAt = chatData._id.getTimestamp();
        chatData.spotsLeft = chatData.maxNumOfUsers - users.length;
        return chatData;
      });
      clientSocket.send(JSON.stringify({ event: 'chatsInSubscribedGroup', data: chats }));
    });
  } else {
    console.log('uso');
    User.findByIdAndUpdate(user._id, {
      $pull: {
        subscribedTo: groupName,
      },
    }, { new: true }).then(results => console.log(results)).catch(err => console.log(err.message));
  }
};
