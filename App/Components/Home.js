import React from 'react';
import ReactDOM from 'react-dom';
import config from '../Config/config';
import Ws from '../utils/ws';
import newMessageEvent from '../eventControllers/newMessageEvent';
import newChatEvent from '../eventControllers/newChatEvent';
import userJoinedChatEvent from '../eventControllers/userJoinedChatEvent';
import userLeftChatEvent  from '../eventControllers/userLeftChatEvent';
import adminClosedChatEvent from '../eventControllers/adminClosedChatEvent';
export default class Home extends React.Component{

constructor(props){
    super(props);
    this.state = {
        personalChats:{},
        otherChats:{},
        notifications:[],
        selectedChat:null
        }
        props.userData.personalChats.forEach(chat => {
            this.state.personalChats[chat._id]={chat}
        });
}

websocket=null
componentDidMount(){
    this.websocket = new Ws(config.url);
    this.websocket.on('ws_close',()=>{console.log('Connection is closed by server')});
    this.websocket.on('newMessage',(data) => newMessageEvent(data,this.setState.bind(this)));
    this.websocket.on('newChat',newChatEvent);
    this.websocket.on('userJoinedChat',userJoinedChatEvent);
    this.websocket.on('userLeftChat',userLeftChatEvent);
    this.websocket.on('adminClosedChat',adminClosedChatEvent);

    this.websocket.connect(this.props.token).then(()=>{
        console.log('success');
        this.websocket.emmit('newMessage',{data:"data"})
    }).catch((err)=>{
        console.log(err);
    })
}
componentWillUnmount(){
    websocket.closeConnection();
}

    render(){
        const token = this.props.token;
        return(
            <div>
                 <p>No messages</p> 
                   
                
            </div>
        )
    }


}