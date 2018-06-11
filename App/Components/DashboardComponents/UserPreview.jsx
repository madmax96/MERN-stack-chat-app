import React from 'react';

export default (props) => {
  let admin;
  if (props.admin) {
    admin = <span>Admin :</span>;
  }
  return (
    <div className="UserPreview">
      {admin}
      <span className="oi oi-person" />
      <span>User Name</span>
    </div>

  );
};
