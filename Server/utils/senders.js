// Methods on WebSocketServer to help sending notifs
function sendNotifToSubscriptionGroup(group, data, creatorOfChat) {
  // this.clients.forEach((client) => {
  //   if (client !== creatorOfChat && client.user.subscribedTo.indexOf(group) !== -1) {
  //     client.send(JSON.stringify({ event: 'newChat', data }));
  //   }
  // });
  this.subscriptionGroups[group].forEach((wsUserInstance) => {
    if (wsUserInstance !== creatorOfChat) {
      wsUserInstance.send(JSON.stringify({ event: 'newChat', data }));
    }
  });
}

function sendAdminMessageToRoom(room, data, event) {
  const usersInGroup = this.chatRooms[room];

  usersInGroup.forEach((user) => {
    // user is Ws Instance
    user.send(JSON.stringify({ event, data }));
  });
}

function sendUserMessageToRoom(room, data, event) {
  const usersInGroup = this.chatRooms[room];

  usersInGroup.forEach((user) => {
    // user is Ws Instance
    user.send(JSON.stringify({ event, data }));
  });
}

module.exports = { sendNotifToSubscriptionGroup, sendUserMessageToRoom, sendAdminMessageToRoom };
