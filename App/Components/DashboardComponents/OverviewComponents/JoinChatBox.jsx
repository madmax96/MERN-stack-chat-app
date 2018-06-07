import React from 'react';


export default () => (
  <div className="joinChatBox text-center">
    <div className="row row-space_between">
      <span className="joinChatBox__group col-1/5">GroupName</span>
      <span className="joinChatBox__date col-1/5">Date</span>
    </div>
    <h4 className="joinChatBox__title margin-top-medium">Title title title</h4>

    <div className="row row-space_evenly row-fluid-1/4 joinChatBox__users margin-top-medium">
      <div>
        <img src="#" alt="#" />
        <span>UserName</span>
      </div>
      <div>
        <img src="#" alt="#" />
        <span>UserName</span>
      </div>
      <div>
        <img src="#" alt="#" />
        <span>UserName</span>
      </div>
    </div>
    <p className="margin-top-medium">3 Spots Left</p>
    <button className="margin-top-medium btn btn-success">JOIN</button>
  </div>
);
