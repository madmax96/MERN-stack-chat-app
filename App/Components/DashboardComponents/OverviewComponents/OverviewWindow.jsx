import React from 'react';
import PropTypes from 'prop-types';
import Group from './Group';
import JoinChatBox from './JoinChatBox';
import Socket from '../../../utils/ws';

const groups = ['Sport', 'Celebrity', 'Politics', 'Movies', 'Songs'];
export default class OverviewWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    };
    this.handleSubscription = this.handleSubscription.bind(this);
  }

  handleSubscription(groupName, isSubscribing) {
    this.props.handleSubscription(groupName, isSubscribing);
  }
  render() {
    return (
      <div className="overviewWindow">
        <div className="groups row row-start">
          {groups.map((name) => {
            const isSubscribed = this.props.subscribedTo.includes(name);


           return (
             <div key={name}className="col-1/5 flexCenter">
               <Group
                 name={name}
                 subscribed={isSubscribed}
                 handleSubscription={
                   (groupName, isSubscribing) => this.handleSubscription(groupName, isSubscribing)}
               />
             </div>);
          })}
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
OverviewWindow.propTypes = {
  subscribedTo: PropTypes.arrayOf(PropTypes.string).isRequired,
  ws: PropTypes.instanceOf(Socket),
  handleSubscription: PropTypes.func,
};

