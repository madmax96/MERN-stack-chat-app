import React from 'react';
import User from '../User';

export default () => (
  <div className="joinChatBox text-center margin-top-small">
    <div className="row row-space_between align-center">
      <span className="col-3/5 joinChatBox__group">
        <span className="oi oi-globe" />
        <span className="name">Group Name</span>
      </span>
      <span className="joinChatBox__date col-1/5">14.7.1996</span>
    </div>
    <h4 className="joinChatBox__title">Title title title</h4>

    <div className="row  joinChatBox__admin">
      <User name="asaaa" />
    </div>
    <p className="">3 Spots Left</p>
    <button className=" joinChatBox__joinBtn btn btn-success">JOIN</button>
  </div>
);
