require('./config/config.js');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const express = require('express');
const app = express();
const httpRouter = require('./httpRouter/index');
const bodyParser = require('body-parser');
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
        server
        // verifyClient:(info)=>{
        //     const url = info.req.url;
        //     return url==='/token_key_here';
        // }
    });
        
    wss.on('connection', function connection(ws,request) {
         console.log('ws connection ' , request.url);
        // if(request.url!=='/token_key_here'){
        //     ws.close(); 
        // } 
      ws.on('message', function incoming(message) {
        console.log('received: ', message);
      });
       
    // console.log(wss.clients.size); //Set
    // wss.clients.forEach((client)=>{ 
    // console.log(client)
    // }) 
    
      ws.send(JSON.stringify({event:'newMessage',from:'user1',text:'asdasdasd'}));
      ws.on('error',(e)=>{
          console.log('client gone ' , e);
      });
      ws.on('close',(e)=>{
        console.log('client close ' , e);
    });
    });