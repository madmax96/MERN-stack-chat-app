// Methods on WebSocketServer to help sending notifs
function sendNotifToSubscriptionGroup(group, data, creatorOfChat) {
  this.subscriptionGroups[group].forEach((user) => {
    if (user !== creatorOfChat) {
      user.send(JSON.stringify({ event: 'newChat', data }));
    }
  });
}

function sendMessageToRoom(room, data, event) {
  const usersInRoom = this.chatRooms[room];
  usersInRoom.forEach((user) => {
    // user is Ws Instance
    user.send(JSON.stringify({ event, data }));
  });
}

function removeUserFromGlobalRooms(ws) {
  ws.user.ChatRooms.forEach((chat) => {
    this.chatRooms[chat.chatId] = this.chatRooms[chat.chatId].filter(user => user != ws);
  });
  ws.user.subscribedTo.forEach((group) => {
    this.subscriptionGroups[group] = this.subscriptionGroups[group].filter(user => user != ws);
  });
}

module.exports = { sendNotifToSubscriptionGroup, sendMessageToRoom, removeUserFromGlobalRooms };
