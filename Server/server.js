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
const userLeftChatEvent = require('./eventControllers/userLeftChatEvent');
const adminClosedChatEvent = require('./eventControllers/adminClosedChatEvent');

const User = require('./models/User');
require('./database/connect');
const server = http.createServer(app);
const publicPath = path.join(__dirname,'..','public');

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     next();
// });

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(httpRouter);


app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});


const port = process.env.PORT;
server.listen(port, function listening() {
    console.log('Listening on %d', port);
});


const wss = new WebSocket.Server({ 
        server,
        verifyClient:(info,callback)=>{
            const token = info.req.url.slice(1);

            User.findByToken(token).then((user) => {
              if (!user) {
                callback(false,401);
              }
          
              info.req.user = user;
              
              callback(true,200);
            }).catch((e) => {
                callback(false,401);
            });   
        }
    });
  
const customEvents = new CustomEvents();
customEvents.on('newMessage',newMessageEvent);
customEvents.on('newChat',newChatEvent);
customEvents.on('userJoinedChat',userJoinedChatEvent);
customEvents.on('userLeftChat',userLeftChatEvent);
customEvents.on('adminClosedChat',adminClosedChatEvent);

wss.rooms = {};
wss.sendMessageToRoom = function sendMessageToRoom (room,data){
    const usersInGroup = wss.rooms[room];
    console.log(room,data);
    if(usersInGroup){
        usersInGroup.forEach((user)=>{
            user.send(JSON.stringify({event:'newMessage',data}));
        })
    }
}
wss.sendNotifToSubscriptionGroup = function sendNotifToSubscriptionGroup (group , data, creatorOfChat){
    console.log(group,data);
    this.clients.forEach(client => {
        if(client !== creatorOfChat && client.user.subscribedTo.indexOf(group)!==-1){
            client.send(JSON.stringify({event:'newChat',data:data}));
        }
    });
}
wss.on('connection', function connection(ws,request) {
    ws.user=request.user;
    ws.on('message', (message)=>customEvents.eventHandler(message,ws,wss));  
    ws.on('error',(e)=>{
        console.log('client gone ' , e);
    });
    ws.on('close',(e)=>{
        console.log('client close ' , e);
    });
    ws.user.activeChats.forEach((chat)=>{
        if(!wss.rooms[chat]){
            wss.rooms[chat] = [ws];
        }else{
            wss.rooms[chat].push(ws);
        }
    });
});

module.exports={
    httpServer:server,
    webSocketServer:wss
}