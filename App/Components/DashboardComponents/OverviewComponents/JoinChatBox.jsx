import React from 'react';
import PropTypes from 'prop-types';
import User from '../User';

export default function JoinChatBox(props) {
  return (
    <div className="joinChatBox text-center margin-top-small">
      <div className="row row-space_between align-center">
        <span className="col-3/5 joinChatBox__group">
          <span className="oi oi-globe" />
          <span className="name">{props.group}</span>
        </span>
        <span className="joinChatBox__date col-1/5">{props.createdAt}</span>
      </div>
      <h4 className="joinChatBox__title">{props.title}</h4>

      <div className="row  joinChatBox__admin">
        <User name={props.creator.userName} />
      </div>
      <p className="">{props.spotsLeft} Spots Left</p>
      <button
        className=" joinChatBox__joinBtn btn btn-success"
        onClick={() => props.handleJoinChat(props._id)}
      >JOIN
      </button>
    </div>
  );
}

JoinChatBox.propTypes = {
  _id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  creator: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  spotsLeft: PropTypes.number.isRequired,
  handleJoinChat: PropTypes.func.isRequired,
};
