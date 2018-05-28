require('./config/config.js');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const express = require('express');

const app = express();
const httpRouter = require('./httpRouter/index');
const bodyParser = require('body-parser');
const CustomEvents = require('./eventControllers/CustomEvents');
const newMessageEvent = require('./eventControllers/newMessageEvent');
const newChatEvent = require('./eventControllers/newChatEvent');
const userJoinedChatEvent = require('./eventControllers/userJoinedChatEvent');
const userSubscribeEvent = require('./eventControllers/userSubscribeEvent');
const messageSeenEvent = require('./eventControllers/messageSeenEvent');
const { sendUserMessageToRoom, sendNotifToSubscriptionGroup, sendAdminMessageToRoom } = require('./utils/senders');
const User = require('./models/User');
require('./database/connect');

const server = http.createServer(app);
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(httpRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(process.env.PORT, () => {
  console.log('Listening on %d', process.env.PORT);
});

const wss = new WebSocket.Server({
  server,
  verifyClient: (info, callback) => {
    const token = info.req.url.slice(1);

    User.findByToken(token).then((user) => {
      if (!user) {
        callback(false, 401);
      }

      info.req.user = user;

      callback(true, 200);
    }).catch(() => {
      callback(false, 401);
    });
  },
});

const customEvents = new CustomEvents();
customEvents.on('newMessage', newMessageEvent);
customEvents.on('newChat', newChatEvent);
customEvents.on('userJoinedChat', userJoinedChatEvent);
customEvents.on('userSubscribeEvent', userSubscribeEvent);
customEvents.on('messageSeenEvent', messageSeenEvent);

wss.chatRooms = {};
wss.subscriptionGroups = {};
wss.sendUserMessageToRoom = sendUserMessageToRoom;
wss.sendAdminMessageToRoom = sendAdminMessageToRoom;
wss.sendNotifToSubscriptionGroup = sendNotifToSubscriptionGroup;

wss.on('connection', (ws, request) => {
  ws.user = request.user;

  ws.on('message', message => customEvents.eventHandler(message, ws, wss));
  ws.on('error', (e) => {
    console.log('client gone ', e);
  });
  ws.on('close', (e) => {
    console.log('client close ', e);
  });
  ws.user.ChatRooms.forEach((chat) => {
    if (!wss.chatRooms[chat.chatId]) {
      wss.chatRooms[chat.chatId] = [ws];
    } else {
      wss.chatRooms[chat.chatId].push(ws);
    }
  });
  ws.user.subscribedTo.forEach((group) => {
    if (!wss.subscriptionGroups[group]) {
      wss.subscriptionGroups[group] = [ws];
    } else {
      wss.subscriptionGroups[group].push(ws);
    }
  });
});

module.exports = {
  httpServer: server,
  wss,
};

