import React from 'react';

export default class SendMessageBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="sendMessageBar row row-align_center">
        <div className="col-7/8 row">
          <input className="sendMessageBar__input" type="text" />
        </div>
        <div className="col-1/8 row">
          <button className="btn btn-info">
            Send
          </button>
        </div>
      </div>
    );
  }
}
