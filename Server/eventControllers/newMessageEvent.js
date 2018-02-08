module.exports = (data,ws,wss)=>{
    console.log('user message handler',data);
    condition={
        chatId:'asdasd'
    }
    wss.broadcast('newMessage',data,ws,condition);
}