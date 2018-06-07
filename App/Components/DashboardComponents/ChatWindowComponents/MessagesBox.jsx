import React from 'react';
import Message from './Message';

export default class MessagesBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="MessagesBox">
        <h3 className="text-center margin-top-medium">Wednesday</h3>

        <Message userName="Admin" userPreview self />
        <Message userName="Admin" self />
        <Message userName="ASAAA" userPreview />
        <Message userName="dasaaa" userPreview />
      </div>
    );
  }
}
