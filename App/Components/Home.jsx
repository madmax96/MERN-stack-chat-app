import React from 'react';
import ReactDOM from 'react-dom';
import config from '../Config/config';
import Ws from '../utils/ws';
import newMessageEvent from '../EventControllers/newMessageEvent';
import newChatEvent from '../EventControllers/newChatEvent';
import userJoinedChatEvent from '../EventControllers/userJoinedChatEvent';
import userLeftChatEvent from '../EventControllers/userLeftChatEvent';
import adminClosedChatEvent from '../EventControllers/adminClosedChatEvent';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personalChats: {},
      otherChats: {},
      notifications: [],
      selectedChat: null,
      messages: [],
    };
    props.userData.activeChats.forEach((chat) => {
      this.state.personalChats[chat._id] = { chat };
    });
  }


  componentDidMount() {
    this.websocket = new Ws(config.url);
    this.websocket.on('ws_close', () => { console.log('Connection is closed by server'); });
    this.websocket.on('newMessage', data => newMessageEvent(data, this.setState.bind(this)));


    // this.websocket.on('newMessage',(data)=>{
    //     this.setState(newMessageEvent(data))
    // });


    this.websocket.on('newChat', newChatEvent);
    this.websocket.on('userJoinedChat', userJoinedChatEvent);
    this.websocket.on('userLeftChat', userLeftChatEvent);
    this.websocket.on('adminClosedChat', adminClosedChatEvent);

    this.websocket.connect(this.props.token).then(() => {
      console.log('success');
      // this.websocket.emmit('newMessage',{text:"testing",chatId:'5aa055277025020678e04176'})
      this.websocket.emmit('newChat', { group: 'Sport', title: 'asaaaaaaaaaaaaaaa', maxNumOfUsers: 6 });
    }).catch((err) => {
      console.log(err);
    });
  }
  componentWillUnmount() {
    this.websocket.closeConnection();
  }

  render() {
    const token = this.props.token;
    return (
      <div>
        <p>Message : {this.state.messages[0]}</p>
      </div>
    );
  }
}
