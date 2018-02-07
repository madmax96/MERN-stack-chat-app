export default class Socket{
    constructor(url,token=''){
   
        this.socket=null;
        this.url=url;
        this.token=token;
        this.registeredEvents=[]; //implementirati preko Seta
        
    };
    connect(){
        try{
            this.socket = new Socket(`${this.url}/${this.token}`);
            return true;
        }catch(e){
            return e;
        }
    }
    on(event,callback){
        if(this.registeredEvents.length===0){
            this.socket.onmessage=(event)=>{
                const message = JSON.parse(event.data);
                const serverEvent=message.event;
                const data = message.text;
                this.registeredEvents.forEach(registeredEvent => {
                    if(registeredEvent.event===serverEvent){
                        registeredEvent.callback(data);
                    }
                });
            }
        }
        this.registeredEvents.push({event,callback});

    }

    emmit(event,data){
        this.socket.send(JSON.stringify({event,data}));
    }

};
// const socket = new WebSocket('ws://localhost:8080/token_key_here');

// // Connection opened
// socket.addEventListener('open', function (event) {
//     socket.send(JSON.stringify({event:'sendMessage',to:'user2',text:'nebitnooo'}));
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', JSON.parse(event.data));
    
// });
// socket.onerror = function(e){
//     console.log('Error' , e);
// } 

// socket.onclose = function(e){ 
//     console.log('closed',e);
// } 

// window.onunload = function(){
//     socket.close();
// }
const socket = new Socket('ws://localhost:8080','token_key_here');
socket.connect();