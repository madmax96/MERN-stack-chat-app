const WebSocket = require('ws');
const { wss } = require('./../server');
const expect = require('expect');
const { users, populateUsers , chats,populateChats } = require('./seed.js');

const sockets = [];
const socketPromises = [];

beforeEach(populateUsers);
beforeEach(populateChats);

describe('WebSocket Server connection', () => {
  it('should authorise users and connect them to WebSocket Server', function wssTest(done) {
    this.timeout(10000);
    let socket;
    users.forEach((user) => {
      socket = new WebSocket(`ws://localhost:${process.env.PORT}/${user.tokens[0]}`);
      sockets.push(socket);
      socketPromises.push(new Promise((resolve, reject) => {
        socket.onopen = function onopen() {
          resolve();
        };
        socket.onerror = function onerror(e) {
          reject(e);
        };
      }));
    });
    Promise.all(socketPromises).then(() => {
      let userNames = [];
      expect(wss.clients.size).toBe(3);
      wss.clients.forEach((wsUserInstance) => {
        userNames.push(wsUserInstance.user.name);
      });
      expect(userNames.includes('User 1') && userNames.includes('User 2')
             && userNames.includes('User 3')).toBe(true);

      //test if subscriptionGroups are populated correctly
      expect(wss.subscriptionGroups['Movies'].length).toBe(3);
      expect(wss.subscriptionGroups['Sport'].length).toBe(2);
      expect(wss.subscriptionGroups['Celebrity'].length).toBe(2);
      expect(wss.subscriptionGroups['Songs'].length).toBe(1);

      //test if chat rooms are populated correctly
      const chatOneRoom = wss.chatRooms[chats[0]._id];
      const chatTwoRoom = wss.chatRooms[chats[1]._id];

      expect(chatOneRoom.length).toBe(2);
      userNames = [];
      chatOneRoom.forEach((wsUserInstance)=>{
        userNames.push(wsUserInstance.user.name);
      });
      expect(userNames.includes('User 1') && userNames.includes('User 2')).toBe(true);
      expect(chatTwoRoom.length).toBe(3);
      done();
    })
      .catch((e) => {
        done(e);
      });
  });
});

module.exports = {
  sockets
}