import React from 'react';
import Group from './Group';
import JoinChatBox from './JoinChatBox';

export default class OverviewWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="overviewWindow">
        <div className="groups row row-start">
          <div className="col-1/5 flexCenter">
            <Group />
          </div>
          <div className="col-1/5 flexCenter">
            <Group />
          </div>
          <div className="col-1/5 flexCenter">
            <Group />
          </div>
        </div>

        <div className="content">
          <div className="row row-fluid-2/9 row-space_evenly newChats">
            <JoinChatBox /> <JoinChatBox /> <JoinChatBox /> <JoinChatBox /> <JoinChatBox />
            <JoinChatBox /> <JoinChatBox /> <JoinChatBox /> <JoinChatBox /> <JoinChatBox />
          </div>
        </div>
      </div>
    );
  }
}
