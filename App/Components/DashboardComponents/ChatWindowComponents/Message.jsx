import React from 'react';
import PropTypes from 'prop-types';

export default function Message(props) {
  let messageClass = 'row row-start';
  if (props.self) {
    messageClass = 'row row-end';
  }

  function messageContent() {
    const { message } = props;
    if (props.user) {
      return (
        <div className="row">
          <div className="message__user col-1/4">
            <img src="#" alt="#" className="message__user__image" />
            <h5 className="message__user__name">{props.user.name}</h5>
          </div>
          <div className="message__text col-3/4">
            {message}
          </div>
        </div>
      );
    }
    return (
      <div className="row row-end">
        <div className="message__text col-3/4">
          {message}
        </div>
      </div>
    );
  }

  return (
    <div className={`${messageClass} messageRow`}>
      <div className="col-7/12 message">

        {messageContent()}

        <div className="row row-end">
          <span className="message__date col-1/7">{props.date}</span>
        </div>
      </div>
    </div>
  );
}

Message.propTypes = {
  date: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  self: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

