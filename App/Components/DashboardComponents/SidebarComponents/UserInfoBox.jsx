import React from 'react';

export default () => (
  <div className="row userInfoBox row-align_center">
    <div className="col-2/3 row row-align_center">
      <span className="oi oi-person userInfoBox__image col-1/3 text-center" />
      <div className="col-2/3">
        <p className="userInfoBox__userName">User Name</p>
        <p className="userInfoBox__email">email@gmail.com</p>
        <buton className="btn btn-danger btn-sm">Logout</buton>
      </div>
    </div>
    <div className="col-1/3">
      <div className="userInfoBox__notifs text-center">
        <span className="oi oi-envelope-open " />
        <span className="userInfoBox__notifs__num">5</span>
      </div>
    </div>
  </div>
);
