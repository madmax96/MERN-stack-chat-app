import React from 'react';

export default class SendMessageBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    const input = e.target.value;
    this.setState(() => ({
      message: input,
    }));
  }

  render() {
    return (
      <div className="sendMessageBar row row-align_center">
        <div className="col-7/8 row">
          <input
            className="sendMessageBar__input"
            type="text"
            onChange={this.handleInput}

          />
        </div>
        <div className="col-1/8 row">
          <button className="btn btn-info" onClick={() => this.props.sendMessage(this.state.message)}>
            Send
          </button>
        </div>
      </div>
    );
  }
}
