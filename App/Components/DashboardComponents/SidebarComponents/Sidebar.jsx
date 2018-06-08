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
        <h3 className="text-center">MyChats</h3>
        <ChatInfoBox onClick={this.props.onChatSelect} />
        <ChatInfoBox onClick={this.props.onChatSelect} />
        <ChatInfoBox onClick={this.props.onChatSelect} />
        <h3 className="text-center">OtherChats</h3>
        <ChatInfoBox />
        <ChatInfoBox />
        <ChatInfoBox />
      </div>
    );
  }
}
