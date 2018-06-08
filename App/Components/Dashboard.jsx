import React from 'react';
import ReactDOM from 'react-dom';
import config from '../Config/config';
import Ws from '../utils/ws';
import newMessageEvent from '../EventControllers/newMessageEvent';
import newChatEvent from '../EventControllers/newChatEvent';
import userJoinedChatEvent from '../EventControllers/userJoinedChatEvent';
import Sidebar from './DashboardComponents/SidebarComponents/Sidebar';
import OverviewWindow from './DashboardComponents/OverviewComponents/OverviewWindow';
import ChatWindow from './DashboardComponents/ChatWindowComponents/ChatWindow';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatWindow: false,
    };
    this.showChatWindow = this.showChatWindow.bind(this);
  }

  componentDidMount() {
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
  render() {
    let window = <OverviewWindow />;
    if (this.state.chatWindow) {
      window = <ChatWindow chatData={{ data: 'data' }} />;
    }
    return (
      <div className="flex-container full-height">
        <div className="row full-height">
          <div className="col-1/4 row row-fluid-1/1 chat-sidebar">
            <Sidebar onChatSelect={chatId => this.showChatWindow(chatId)} />
          </div>
          <div className="col-3/4">
            {window}
          </div>
        </div>
      </div>
    );
  }
}
