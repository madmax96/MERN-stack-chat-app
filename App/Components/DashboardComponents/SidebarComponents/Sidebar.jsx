import React from 'react';
import PropTypes from 'prop-types';
import UserInfoBox from './UserInfoBox';
import ChatInfoBox from './ChatInfoBox';


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: '',
      maxUsers: '',
      title: '',
      error: false,
      chatFormOpen: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNewChatCreation = this.handleNewChatCreation.bind(this);
  }
  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }
  handleNewChatCreation() {
    if (this.state.chatFormOpen) {
      const { group, maxUsers, title } = this.state;
      if (!group || title.length < 5 || maxUsers < 2 || maxUsers > 8) {
        this.setState(() => ({ error: 'Please insert all data correctly' }));
        return;
      }
      this.props.createNewChat({ group, maxUsers, title });
    }
    this.setState(prevState => ({ chatFormOpen: !prevState.chatFormOpen }));
  }
  render() {
    return (
      <div className="sidebar">
        <UserInfoBox userData={this.props.userData} />
        <div className="sidebar__chatList">
          {this.props.chats.map(chat => (<ChatInfoBox
            key={chat.chatId}
            onClick={this.props.onChatSelect}
            {...chat}
          />))}
        </div>
        <div className="sidebar__makeChat">
          <button className="btn btn-success" onClick={this.handleNewChatCreation}> {this.state.chatFormOpen ? 'SUBMIT' : 'MAKE NEW CHAT'}</button>
        </div>

        <div className={`text-center makeChatForm makeChatForm--${this.state.chatFormOpen ? 'shown' : 'hidden'}`}>
          <form >
            {this.state.error && (
            <div className="alert alert-danger" role="alert">
              {this.state.error}
            </div>)}

            <input type="text" name="title" onChange={this.handleInputChange} placeholder="Your chat title" />
            <input
              type="number"
              name="maxUsers"
              max={8}
              min={2}
              onChange={this.handleInputChange}
              placeholder="Number of users"
            />
            <select name="group" id="group" onChange={this.handleInputChange}>
              <option value="">Select Group </option>
              {this.props.subscribedTo
                .map(group => (<option key={group} value={group}>{group} </option>))}
            </select>
          </form>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  onChatSelect: PropTypes.func.isRequired,
  chats: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
    group: PropTypes.string.isRequired,
    chatId: PropTypes.string.isRequired,
    lastMessage: PropTypes.shape({
      text: PropTypes.string,
      time: PropTypes.string,
    }),
    numOfNotSeenMessages: PropTypes.number.isRequired,

  })),
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  subscribedTo: PropTypes.arrayOf(PropTypes.string),
  createNewChat: PropTypes.func,
};

