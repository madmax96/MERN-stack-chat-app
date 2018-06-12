import React from 'react';

export default (props) => {
  let admin;
  if (props.admin) {
    admin = <span />;
  }
  return (
    <div className="userPreview">
      {admin}
      <span className="oi oi-person" />
      <span>User Name</span>
    </div>

  );
};
