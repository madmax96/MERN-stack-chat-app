
/*
Receive{
    messageId:ObjectID,
    chatId: ObjectID
}

broadcast{
  userId:ObjectID,
  chatID:ObjectID,
  messageId:ObjectID,
}
*/
const ChatRoom = require('./../models/ChatRoom');

module.exports = (data, clientSocket, wss) => {
  const { user } = clientSocket;
  const { messageId } = data;
  const { chatId } = data;

  const updatePromise = ChatRoom.findOneAndUpdate(
    { _id: chatId, 'users.userId': user._id },
    {
      'users.$.lastMessageSeen': messageId,
    }, { new: true },
  );
  updatePromise.then(() => {
    const data = {
      userId: user._id,
      chatId,
      messageId,
    };
    debugger;
    wss.sendUserMessageToRoom(chatId, data, 'messageSeenEvent');
  });
};
