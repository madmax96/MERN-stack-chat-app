import React from 'react';
import UserInfoBox from './UserInfoBox';
import ChatInfoBox from './ChatInfoBox';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="sidebar">
        <UserInfoBox />
        <div className="sidebar__chatList">
          <ChatInfoBox onClick={this.props.onChatSelect} />
          <ChatInfoBox onClick={this.props.onChatSelect} />
          <ChatInfoBox onClick={this.props.onChatSelect} />
          <ChatInfoBox />
          <ChatInfoBox />
          <ChatInfoBox />
          <ChatInfoBox />
        </div>
        <div className="sidebar__makeChat">
          <button className="btn btn-success">MAKE NEW CHAT</button>
        </div>
      </div>
    );
  }
}
