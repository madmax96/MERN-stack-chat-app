import React from 'react';
import OverviewWindow from './OverviewComponents/OverviewWindow';
import ChatWindow from './ChatWindowComponents/ChatWindow';

export default class MainWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ChatWindow />
    );
  }
}
