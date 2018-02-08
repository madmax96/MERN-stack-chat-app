export default class Socket{
    constructor(url,token=''){
   
        this.socket=null;
        this.url=url;
        this.token=token;
        this.registeredEvents={};
        
    };
    connect(){
        return new Promise((res,rej)=>{
            try{
                this.socket = new WebSocket(`${this.url}/${this.token}`);
            }catch(e){
                rej(e);
            }
            this.socket.onerror=(e)=>{ 
                rej(e);
            };
            this.socket.onopen=()=>{
                this.socket.onmessage=(message)=>{
                    const messageData = JSON.parse(message.data);
                    const serverEvent=messageData.event;
                    const data = messageData.data;
                    if(this.registeredEvents[serverEvent]){
                        this.registeredEvents[serverEvent](data);
                    }
                };   
                this.socket.onclose=()=>{
                    this.registeredEvents['ws_close']();
                }
              window.onunload=()=>{
                  this.closeConnection();
              }
                res();
            }
        });
      
    }
    on(event,callback){
        this.registeredEvents[event] = callback;
    }

    emmit(event,data){
        this.socket.send(JSON.stringify({event,data}));
    }

    closeConnection(){
        this.socket.close();
    }

};
