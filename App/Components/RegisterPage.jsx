import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class RegisterPage extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
      password: '',
      passwordError: '',
      nameError: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.startRegister = this.startRegister.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  startRegister(e) {
    e.preventDefault();
    const { email, password, userName } = this.state;
    let errors = false;

    if (password.length < 6) {
      this.setState(() => ({ passwordError: 'Password must have minimum 6 characters' }));
      errors = true;
    } else {
      this.setState(() => ({ passwordError: '' }));
    }

    if (userName.length < 3) {
      this.setState(() => ({ nameError: 'Must be a valid name' }));
      errors = true;
    } else {
      this.setState(() => ({ nameError: '' }));
    }
    if (!errors) {
      axios.post('/register', { name: userName, email, password })
        .then(() => {
          this.setState(() => ({
            message: 'Registration successfull.You can now log in',
            passwordError: '',
            nameError: '',
          }));
        })
        .catch((err) => {
          if (err.response.status >= 500) {
            this.setState({ message: 'Our service is down! Please try again later' });
          } else {
            this.setState({ message: 'Email is already in use' });
          }
        });
    }
  }


  render() {
    let messageBox;
    if (this.state.message) {
      messageBox = (
        <div className="alert alert-info" role="alert">
          {this.state.message}
        </div>);
    }
    return (
      <div className="row row-align_center full-height">
        <div className="col-1/3 text-center">

          <form onSubmit={this.startRegister}>
            <img className="mb-4" src="" alt="" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
            {messageBox}
            <label htmlFor="inputUserName" className="sr-only">Name</label>
            <input
              onChange={this.handleInputChange}
              id="inputUserName"
              className="form-control"
              placeholder="Your name"
              required="true"
              type="text"
              name="userName"
            /><span>{this.state.nameError}</span>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input
              onChange={this.handleInputChange}
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required="true"
              type="email"
              name="email"
            />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input
              onChange={this.handleInputChange}
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required="true"
              type="password"
              name="password"
            /><span>{this.state.passwordError}</span>
            <button className="btn btn-lg btn-primary btn-block margin-top-small" type="submit">Register</button>
            <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
          </form>
          <Link to="/">  Go back to login </Link>
        </div>
      </div>
    );
  }
}
