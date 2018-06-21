import React from 'react';
import PropTypes from 'prop-types';
import config from '../Config/config';
import Ws from '../utils/ws';
import newMessageEvent from '../EventControllers/newMessageEvent';
import newChatEvent from '../EventControllers/newChatEvent';
import userJoinedChatEvent from '../EventControllers/userJoinedChatEvent';
import Sidebar from './DashboardComponents/SidebarComponents/Sidebar';
import OverviewWindow from './DashboardComponents/OverviewComponents/OverviewWindow';
import ChatWindow from './DashboardComponents/ChatWindowComponents/ChatWindow';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: props.userData.chatsData || {},
      subscriptions: this.props.userData.subscribedTo,
      chatWindow: false,
    };
    this.showChatWindow = this.showChatWindow.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleSubscription = this.handleSubscription.bind(this);
    this.createNewChat = this.createNewChat.bind(this);
  }

  componentWillMount() {
    this.websocket = new Ws(config.url);
    this.websocket.on('ws_close', () => { console.log('Connection is closed by server'); });
    this.websocket.on('newMessage', data => newMessageEvent(data, this.setState.bind(this)));
    this.websocket.on('newChat', newChatEvent);
    this.websocket.on('userJoinedChat', userJoinedChatEvent);

    this.websocket.connect(this.props.token).then(() => {
      console.log('success');
    }).catch((err) => {
      console.log(err);
    });
  }

  componentWillUnmount() {
    this.websocket.closeConnection();
  }
  showChatWindow(chatId) {
    this.setState(() => ({
      chatWindow: chatId,
    }));
  }

  sendMessage(text) {
    if (text) {
      this.websocket.emmit('newMessage', {
        text,
        chatId: this.state.chatWindow,
      });
    }
  }
  handleSubscription(groupName, isSubscribing) {
    this.setState(prevState => (isSubscribing ? {
      subscriptions: [...prevState.subscriptions, groupName],
    } : {
      subscriptions: prevState.subscriptions.filter(name => name !== groupName),
    }));
    this.websocket.emmit('userSubscribeEvent', { groupName, subscribe: isSubscribing });
  }
  createNewChat(data) {
    const { group, maxUsers, title } = data;
    this.websocket.emmit('newChat', { group, maxNumOfUsers: maxUsers, title });
  }
  render() {
    let window = (<OverviewWindow
      subscribedTo={this.state.subscriptions}
      ws={this.websocket}
      handleSubscription={
        (groupName, isSubscribing) => this.handleSubscription(groupName, isSubscribing)
      }
    />);
    const { chatWindow } = this.state;
    if (chatWindow) {
      window = (<ChatWindow
        {...this.state.chats[chatWindow]}
        userId={this.props.userData.userId}
        sendMessage={text => this.sendMessage(text)}
      />);
    }

    const sidebarChats = Object.keys(this.state.chats);
    sidebarChats.forEach((chatId, i) => {
      const chat = this.state.chats[chatId];
      const { title, creator, group } = chat;
      const isAdmin = creator === this.props.userData.userId;
      const numOfMessages = chat.messages.length;
      let numOfNotSeenMessages = 0;
      let lastMessage;
      if (numOfMessages !== 0) {
        const { text, time } = chat.messages[numOfMessages - 1];
        lastMessage = { text, time };
        const { lastMessageSeen } = chat.users
          .find(user => user.userId == this.props.userData.userId);
        const seenMessages = chat.messages.findIndex(message => message._id == lastMessageSeen) + 1;
        numOfNotSeenMessages = numOfMessages - seenMessages;
      }
      sidebarChats[i] = {
        title,
        isAdmin,
        group,
        chatId,
        lastMessage,
        numOfNotSeenMessages,
      };
    });
    const { name, email } = this.props.userData;
    return (
      <div className="flex-container full-height">
        <div className="row full-height">
          <div className="col-1/4 row row-fluid-1/1 chat-sidebar">
            <Sidebar
              onChatSelect={chatId => this.showChatWindow(chatId)}
              chats={sidebarChats}
              userData={
               { name, email }
              }
              createNewChat={data => this.createNewChat(data)}
              subscribedTo={this.state.subscriptions}
            />
          </div>
          <div className="col-3/4">
            {window}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  token: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    subscribedTo: PropTypes.arrayOf(PropTypes.string).isRequired,
    chatsData: PropTypes.object.isRequired,
  }).isRequired,

};
