import React from 'react';
import PropTypes from 'prop-types';

export default function User(props) {
  return (
    <span className="user">

      <span className="oi oi-person" />
      <span className="margin-left-small" >{props.name}</span>
    </span>

  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
};
