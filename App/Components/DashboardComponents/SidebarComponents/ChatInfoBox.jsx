import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


export default function ChatInfoBox(props) {
  let lastMessageTime;
  if (props.lastMessage) {
    const { lastMessage } = props;
    const timestamp = new Date(lastMessage.time).getTime();
    const date = moment(timestamp).format('YYYY-MM-DD');
    const time = moment(timestamp).format('HH:mm:ss');
    lastMessageTime = `${date} ${time}`;

    if (lastMessage.text.length >= 20) {
      lastMessage.text = lastMessage.text.substring(0, 20).concat('...');
    }
  }
  let { title } = props;
  if (props.title.length >= 20) {
    title = props.title.substring(0, 20).concat('...');
  }

  return (
    <div className="row row-space_around chatInfoBox" onClick={() => props.onClick(props.chatId)}>
      <div className="col-5/9">
        <span className="chatInfoBox__group oi oi-globe" />
        {props.isAdmin &&
          <span className="chatInfoBox__admin oi oi-person" />
        }
        <p className="chatInfoBox__name">{title}</p>
        <p className="chatInfoBox__lastMessage">{props.lastMessage ? props.lastMessage.text : '' }</p>
      </div>
      <div className="col-1/3 text-center">
        <p className="chatInfoBox__date">{lastMessageTime || ''}</p>
        {props.numOfNotSeenMessages !== 0 &&
        <div className="chatInfoBox__messagesNum">{props.numOfNotSeenMessages}</div>}
      </div>
    </div>
  );
}

ChatInfoBox.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  group: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
  lastMessage: PropTypes.shape({
    text: PropTypes.string,
    time: PropTypes.string,
  }),
  numOfNotSeenMessages: PropTypes.number.isRequired,

};

