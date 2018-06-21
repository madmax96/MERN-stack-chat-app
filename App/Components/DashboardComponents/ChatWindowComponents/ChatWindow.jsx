import React from 'react';
import PropTypes from 'prop-types';
import ChatWindowHeader from './ChatWindowHeader';
import MessagesBox from './MessagesBox';
import SendMessageBar from './SendMessageBar';

export default function ChatWindow(props) {
  // console.log(props);
  const users = {};
  props.users.forEach((user) => {
    users[user.userId] = user;
  });
  return (
    <div>
      <ChatWindowHeader
        title={props.title}
        users={props.users.map(user => user.userName)}
      />
      <MessagesBox messages={props.messages} userId={props.userId} users={users} />
      <SendMessageBar sendMessage={props.sendMessage} />
    </div>
  );
}

ChatWindow.propTypes = {
  // group: chats[0].group,
  // maxNumOfUsers: chats[0].maxNumOfUsers,
  // creator: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,

  })),
  userId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    lastMessageSeen: PropTypes.string,
  })),
  sendMessage: PropTypes.func.isRequired,
};
