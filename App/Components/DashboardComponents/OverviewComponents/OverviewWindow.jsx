import React from 'react';
import Groups from './Groups';
import NewChatsOverview from './NewChatsOverview';

export default class OverviewWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Groups />
        <NewChatsOverview />

      </div>
    );
  }
}
