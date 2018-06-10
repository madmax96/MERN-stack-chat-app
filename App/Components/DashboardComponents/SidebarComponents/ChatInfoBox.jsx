import React from 'react';

export default props => (
  <div className="row row-space_around chatInfoBox" onClick={() => props.onClick('testing')}>
    <div className="col-5/9">
      <span className="chatInfoBox__group oi oi-globe" />
      <span className="chatInfoBox__admin oi oi-person" />

      <p className="chatInfoBox__name">Chat is about bla bla</p>
      <p className="chatInfoBox__lastMessage">Bla bla last message</p>
    </div>
    <div className="col-1/3 text-center">
      <p className="chatInfoBox__date">14.7.1996</p>
      <div className="chatInfoBox__messagesNum">5</div>
    </div>
  </div>
);
