// Methods on WebSocketServer to help sending notifs
function sendNotifToSubscriptionGroup(group, data, creatorOfChat) {
  this.subscriptionGroups[group].forEach((user) => {
    if (user !== creatorOfChat) {
      user.send(JSON.stringify({ event: 'newChat', data }));
    }
  });
}

function sendMessageToRoom(room, data, event) {
  const usersInGroup = this.chatRooms[room];

  usersInGroup.forEach((user) => {
    // user is Ws Instance
    user.send(JSON.stringify({ event, data }));
  });
}

module.exports = { sendNotifToSubscriptionGroup, sendMessageToRoom };
