// Methods on WebSocketServer to help sending notifs
function sendNotifToSubscriptionGroup(group, data, creatorOfChat) {
  this.clients.forEach((client) => {
    if (client !== creatorOfChat && client.user.subscribedTo.indexOf(group) !== -1) {
      client.send(JSON.stringify({ event: 'newChat', data }));
    }
  });
}

function sendMessageToRoom(room, data) {
  const usersInGroup = this.chatRooms[room];
  if (usersInGroup) {
    usersInGroup.forEach((user) => {
      user.send(JSON.stringify({ event: 'newMessage', data }));
    });
  }
}


module.exports = { sendNotifToSubscriptionGroup, sendMessageToRoom };
