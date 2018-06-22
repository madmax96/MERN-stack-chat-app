import React from 'react';
import PropTypes from 'prop-types';
import Group from './Group';
import JoinChatBox from './JoinChatBox';

const groups = ['Sport', 'Celebrity', 'Politics', 'Movies', 'Songs'];
export default function OverviewWindow(props) {
  return (
    <div className="overviewWindow">
      <div className="groups row row-start">
        {groups.map((name) => {
            const isSubscribed = props.subscribedTo.includes(name);
           return (
             <div key={name}className="col-1/5 flexCenter">
               <Group
                 name={name}
                 subscribed={isSubscribed}
                 handleSubscription={
                   props.handleSubscription}
               />
             </div>);
          })}
      </div>
      <div className="content">
        <div className="row row-fluid-2/9 row-space_evenly newChats">
          {props.chats.map(chat => (<JoinChatBox
            {...chat}
            key={chat.createdAt}
            handleJoinChat={props.handleJoinChat}
          />))}
        </div>
      </div>
    </div>
  );
}

OverviewWindow.propTypes = {
  subscribedTo: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubscription: PropTypes.func,
  chats: PropTypes.arrayOf(PropTypes.shape({
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
  handleJoinChat: PropTypes.func,
};

