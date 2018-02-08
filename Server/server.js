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
        verifyClient:(info)=>{
            const url = info.req.url;
            return url==='/token_key_here';
        }
    });
wss.broadcast = function broadcast(event,data,wsClient,condition) {
    wss.clients.forEach(function each(client) {
        let isConditionFullfiled=true;
        // for(prop in condition){
        //     if(wsClient.clientData[prop]!==condition[prop]){
        //         isConditionFullfiled = false;
        //         return;
        //     }
        // }
        if (client!==wsClient && isConditionFullfiled && client.readyState === WebSocket.OPEN ) {
            client.send(JSON.stringify({event,data}));
        }
    });
};    
const customEvents = new CustomEvents();
customEvents.on('userMessage',newMessageEvent);

wss.on('connection', function connection(ws,request) {
    console.log('ws connection ' , request.url);
    ws.on('message', (message)=>customEvents.eventHandler(message,ws,wss));  
    ws.on('error',(e)=>{
        console.log('client gone ' , e);
    });
    ws.on('close',(e)=>{
        console.log('client close ' , e);
    });
});