import React from 'react';
import PropTypes from 'prop-types';

export default function Group(props) {
  return (
    <div className="group" onClick={() => props.handleSubscription(props.name, !props.subscribed)}>
      <div className="group__info">
        <span className="group__icon oi oi-globe" />
        <p className="group__name">{props.name}</p>
      </div>
      {props.subscribed && <span className="group__icon group__icon--check oi oi-check" /> }
    </div>
  );
}
Group.propTypes = {
  name: PropTypes.string.isRequired,
  subscribed: PropTypes.bool.isRequired,
  handleSubscription: PropTypes.func.isRequired,
};
