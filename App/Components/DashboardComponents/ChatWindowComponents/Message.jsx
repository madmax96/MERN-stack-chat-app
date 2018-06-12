import React from 'react';
import PropTypes from 'prop-types';
import UserPreview from '../UserPreview';

export default function Message(props) {
  function messageContent() {
    const { message } = props;
    if (props.user) {
      return (
        <div className="row">
          <div className="message__user col-1/6 text-center">
            <span className="oi oi-person" />
            <h5 className="message__user__name">{props.user.name}</h5>
          </div>
          <div className="message__text col-5/6">
            {message}
          </div>
        </div>
      );
    }
    return (
      <div className="row row-end">
        <div className="message__text col-5/6">
          {message}
        </div>
      </div>
    );
  }

  return (

    <div className="message">

      {messageContent()}

      <div className="row">
        <div className="col-6/7 row row-start"><span>Seen:</span>
          <UserPreview />
          <UserPreview />
          <UserPreview />
          <UserPreview />
        </div>
        <span className="message__date col-1/7">{props.date}</span>
      </div>
    </div>

  );
}

Message.propTypes = {
  date: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

