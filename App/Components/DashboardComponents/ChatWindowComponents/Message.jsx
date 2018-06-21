import React from 'react';
import PropTypes from 'prop-types';
import User from '../User';

export default function Message(props) {
  const { text } = props;
  let userBox;
  if (props.user) {
    userBox = (
      <div className="row row-start message__user">
        <User name={props.user.name} />
      </div>);
  }


  return (

    <div className="message">
      {userBox}
      <div className="row row-start">
        <div className="message__text">
          {text}
        </div>
      </div>

      <div className="row">
        <div className="col-6/7 row row-start message__seen">
          {props.seen.length !== 0 && <span>Seen: </span>}
          {props.seen.map((userName, i) => (<span key={userName + i} className="margin-left-small"><User name={userName} /></span>))}

        </div>
        <span className="message__date col-1/7 margin-left-big text-center">{props.time}</span>
      </div>
    </div>

  );
}

Message.propTypes = {
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  seen: PropTypes.arrayOf(PropTypes.string),
};

