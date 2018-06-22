import React from 'react';
import PropTypes from 'prop-types';

export default function UserInfoBox(props) {
  return (
    <div className="row userInfoBox row-align_center">
      <div className="col-2/3 row row-align_center">
        <span className="oi oi-person userInfoBox__image col-1/3 text-center" />
        <div className="col-2/3">
          <p className="userInfoBox__userName">{props.userData.name}</p>
          <p className="userInfoBox__email">{props.userData.email}</p>
          <buton className="btn btn-danger btn-sm" onClick={props.logout}>Logout</buton>
        </div>
      </div>
      <div className="col-1/3">
        <div className="userInfoBox__notifs text-center">
          <span className="oi oi-home " onClick={props.showDashboard} />
          {/* <span className="userInfoBox__notifs__num">5</span> */}
        </div>
      </div>
    </div>
  );
}

UserInfoBox.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  showDashboard: PropTypes.func,
  logout: PropTypes.func,
};
