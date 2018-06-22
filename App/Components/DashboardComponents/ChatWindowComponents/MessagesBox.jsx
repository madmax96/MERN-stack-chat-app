import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Message from './Message';

export default function MessagesBox(props) {
  let lastMessageUser;
  let lastDate;
  return (
    <div className="messagesBox">

      {props.messages.map((message) => {
          const className = props.userId === message.creator ? 'row-end' : 'row-start';
          const seen = [];
          const userIDs = Object.keys(props.users);
         userIDs.forEach((userId) => {
            if (props.users[userId].lastMessageSeen === message._id) {
              seen.push(props.users[userId].userName);
            }
          });
          let user;
          let adminMessage;
          if (message.creator !== '000000000000000000000000') {
             user = lastMessageUser === message.creator ? null :
            { name: props.users[message.creator].userName };
          } else {
            adminMessage =
              (
                <p key={message._id} className="text-center margin-bottom-small margin-top-small">
                  <span className=" dateTextBox ">{message.text}
                  </span>
                </p>);
          }
          lastMessageUser = message.creator;
          const timestamp = new Date(message.time).getTime();
          const date = moment(timestamp).format('YYYY-MM-DD');
          const time = moment(timestamp).format('HH:mm:ss');
          const dateHeader = date === lastDate ? null :
            (
              <p className="text-center margin-bottom-small margin-top-small">
                <span className=" dateTextBox ">{date}
                </span>
              </p>);
            lastDate = date;
          return (
            <div key={message._id}>
              {dateHeader}
              {adminMessage || (
              <div className={`row ${className}`}>
                <div className={`col-4/7 row ${className}`}>
                  <Message
                    {...message}
                    time={time}
                    seen={seen}
                    user={user}
                  />
                </div>
              </div>)}
            </div>
        );
      })
    }
    </div>
  );
}


MessagesBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,

  })),
  userId: PropTypes.string.isRequired,
  users: PropTypes.objectOf(PropTypes.shape({
    userId: PropTypes.string,
    userName: PropTypes.string.isRequired,
    lastMessageSeen: PropTypes.string,
  })),
};
