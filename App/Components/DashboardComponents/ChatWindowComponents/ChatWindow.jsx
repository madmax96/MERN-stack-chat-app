import React from 'react';
import ChatWindowHeader from './ChatWindowHeader';
import MessagesBox from './MessagesBox';
import SendMessageBar from './SendMessageBar';

export default class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <ChatWindowHeader />
        <MessagesBox />
        <SendMessageBar />
      </div>
    );
  }
}
