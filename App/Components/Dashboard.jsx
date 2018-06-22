import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AppRouter from '../Routers/AppRouter';
import config from '../Config/config';
import Ws from '../utils/ws';
import newMessageEvent from '../EventControllers/newMessageEvent';
import chatCreationEvent from '../EventControllers/chatCreationEvent';
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
      availableChats: this.props.userData.availableChats,
    };
    this.websocket = new Ws(config.url);
    this.websocket.on('ws_close', () => { console.log('Connection is closed by server'); });
    this.websocket.on('newMessage', data => newMessageEvent(data, this.setState.bind(this)));
    this.websocket.on('chatCreation', data => chatCreationEvent(data, this.setState.bind(this)));
    this.websocket.on('userJoinedChat', data => userJoinedChatEvent(data, this.setState.bind(this)));
    this.websocket.on('chatsInSubscribedGroup', (data) => {
      this.setState(prevState => ({
        availableChats: [...data, ...prevState.availableChats],
      }));
    });
    this.websocket.on('newChat', (data) => {
      let { users, chatId, ...chatData } = data;
      chatData = {
        ...chatData,
        _id: chatId,
      };
      console.log('chat Data', chatData);
      this.setState(prevState => ({
        availableChats: [chatData, ...prevState.availableChats],
      }));
    });

    this.websocket.on('joinedChatData', (data) => {
      const { chatId, currentMessages, currentUsers } = data;
      this.setState(prevState => ({
        chats: {
          ...prevState.chats,
          [chatId]: {
            ...prevState.chats[chatId],
            messages: currentMessages,
            users: currentUsers,
          },
        },
      }));
    });


    this.logout = this.logout.bind(this);
    this.showDashboard = this.showDashboard.bind(this);
    this.showChatWindow = this.showChatWindow.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleSubscription = this.handleSubscription.bind(this);
    this.createNewChat = this.createNewChat.bind(this);
    this.handleJoinChat = this.handleJoinChat.bind(this);
  }

  componentDidMount() {
    console.log('did mount');
    this.websocket.connect(this.props.token).then(() => {
      console.log('success');
    }).catch((err) => {
      console.log(err);
    });
  }

  componentWillUnmount() {
    this.websocket.closeConnection();
  }
  logout() {
    this.websocket.closeConnection();
    localStorage.setItem('x-auth', '');
    ReactDOM.render(<AppRouter />, document.getElementById('react-app'));
  }
  showDashboard() {
    this.setState({
      chatWindow: false,
    });
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
    if (!isSubscribing) {
      this.setState(prevState => ({
        availableChats: prevState.availableChats.filter(chat => chat.group !== groupName),
        subscriptions: prevState.subscriptions.filter(name => name !== groupName),
      }));
    } else {
      this.setState(prevState => ({
        subscriptions: [...prevState.subscriptions, groupName],
      }));
    }
    this.websocket.emmit('userSubscribeEvent', { groupName, subscribe: isSubscribing });
  }
  createNewChat(data) {
    const { group, maxUsers, title } = data;
    this.websocket.emmit('newChat', { group, maxNumOfUsers: maxUsers, title });
  }
  handleJoinChat(chatId) {
    const chatInfo = this.state.availableChats.find(chat => chat._id === chatId);
    let {
      title, maxNumOfUsers, group, creator,
    } = chatInfo;
    creator = creator.userId;
    this.setState(prevState => ({
      chats: {
        ...prevState.chats,
        [chatId]: {
          title,
          maxNumOfUsers,
          group,
          creator,
          users: [{ userId: this.props.userData.userId, userName: this.props.userData.name }],
          messages: [],

        },
      },
      availableChats: prevState.availableChats.filter(chat => chat._id !== chatId),
    }));
    this.websocket.emmit('userJoinedChat', { chatId });
  }

  render() {
    let window = (<OverviewWindow
      subscribedTo={this.state.subscriptions}
      ws={this.websocket}
      handleSubscription={
        (groupName, isSubscribing) => this.handleSubscription(groupName, isSubscribing)
      }
      handleJoinChat={chatId => this.handleJoinChat(chatId)}
      chats={this.state.availableChats}

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
      console.log(chat.users.length);
      if (numOfMessages !== 0 && chat.users.length !== 0) {
        const { text, time } = chat.messages[numOfMessages - 1];
        lastMessage = { text, time };

        const user = chat.users
          .find(user => user.userId == this.props.userData.userId);
        if (user) {
          const { lastMessageSeen } = user;
          if (!lastMessageSeen) {
            numOfNotSeenMessages = numOfMessages;
          } else {
            const seenMessages = chat.messages
              .findIndex(message => message._id == lastMessageSeen) + 1;
            numOfNotSeenMessages = numOfMessages - seenMessages;
          }
        }
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
              showDashboard={this.showDashboard}
              logout={this.logout}
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
    availableChats: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        userId: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
      }).isRequired,
      title: PropTypes.string.isRequired,
      group: PropTypes.string.isRequired,
      spotsLeft: PropTypes.number.isRequired,
    })),
  }).isRequired,

};
