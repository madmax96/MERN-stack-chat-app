/*


Receive{
    group:String,
    title:String,
    maxNumOfUsers:Number
}
broadcast{
    group:String,
    title:String,
    maxNumOfUsers:Number
    chatId:ObjectId
    admin:User
}

*/

const {ObjectID} = require("mongodb");
const ChatRoom = require('./../models/ChatRoom');
const Message = require('./../models/Message');
module.exports = (data,clientSocket,WebSocketServer)=>{
    const user = clientSocket.user;
    //const {creator,isActive,group,title,maxNumOfUsers} = data;
    data.creator = user._id;
    const newChatRoom = new ChatRoom(data);
    newChatRoom.save().then((chatData)=>{
        console.log('success saving chat',chatData);
        //send notif to everyone subscribed to group
        WebSocketServer.clients.forEach(client => {
            if(client.user.subscribedTo.indexOf(data.group)!==-1){
                const dataToSend = {
                    ...data,
                    chatId:chatData._id,
                    creator:{
                        name:user.name
                    },
                    
                }
               // console.log('dts ',dataToSend);
                client.send(JSON.stringify({event:'newChat',data:dataToSend}));
            }
        });
        // WebSocketServer.broadcast.toGroup('Sport',dataToSend);
        // WebsocketServer.broadcast.toChat('chatId',dataToSend);
    }).catch((e)=>{
        console.log(e)
    })
}