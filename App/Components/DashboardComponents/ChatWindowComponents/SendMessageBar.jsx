import React from 'react';

export default class SendMessageBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="sendMessageBar row">
        <div className="col-7/8">
          <input className="sendMessageBar__field" type="text" />
        </div>
        <div className="col-1/8">
          <button className="btn btn-info">
            Send
          </button>
        </div>
      </div>
    );
  }
}
