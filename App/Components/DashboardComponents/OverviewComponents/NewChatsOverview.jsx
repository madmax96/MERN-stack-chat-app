import React from 'react';
import JoinChatBox from './JoinChatBox';

export default () => (
  <div >
    <h2 className="text-center">JOIN CHAT</h2>
    <div className="row row-fluid-1/4">
      <JoinChatBox />
      <JoinChatBox />
      <JoinChatBox />
      <JoinChatBox />
    </div>
    <h2 className="text-center">Or Make new one</h2>
    <button className="btn btn-success margin-top-big">MAKE CHAT</button>
  </div>
);
