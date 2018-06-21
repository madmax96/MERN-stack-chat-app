import React from 'react';
import PropTypes from 'prop-types';
import User from './../User';


export default function ChatWindowHeader(props) {
  return (
    <div className="chatWindowHeader">
      <p className="chatWindowHeader__title"> {props.title} </p>
      <div className="row row-start row-fluid-1/7">
        {props.users.map((name, i) => (<User key={`${name}${i}`} name={name} />))}
      </div>
    </div>
  );
}

ChatWindowHeader.propTypes = {
  title: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.string),
};

