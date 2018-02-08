class CustomEvents{

    constructor(){
        this.registeredEvents={};
        this.eventHandler=this.eventHandler.bind(this);
    }

    on(event,callback){
        this.registeredEvents[event]=callback;
    }
    eventHandler(message,ws,wss){
        message = JSON.parse(message);
        const handler = this.registeredEvents[message.event];
        if(handler){
           handler(message.data,ws,wss);
        }
    }
}

module.exports=CustomEvents;