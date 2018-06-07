import React from 'react';

export default (props) => {
  let admin;
  if (props.admin) {
    admin = <span>Admin :</span>;
  }
  return (
    <div className="UserPreview">
      <img src="#" alt="#" />
      {admin}
      <span>User Name</span>
    </div>

  );
};
