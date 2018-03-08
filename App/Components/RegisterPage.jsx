import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class RegisterPage extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordError: '',
      nameError: '',
      message: '',
    };
    this.onEmailChange = this.onEmailChange.bind(this);
  }

  onEmailChange(e) {
    const email = e.target.value;
    this.setState({ email });
  }

  onPasswordChange(e) {
    const password = e.target.value;
    this.setState({ password });
  }
  onNameChange(e) {
    const name = e.target.value;
    this.setState({ name });
  }

  startRegister(e) {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const name = this.state.name;
    let errors = false;
    if (password.length < 6) {
      this.setState({ passwordError: 'Password must have minimum 6 characters' });
      errors = true;
    }

    if (name.length < 6) {
      this.setState({ nameError: 'Must be a valid name' });
      errors = true;
    }
    if (!errors) {
      axios.post('/register', { name, email, password })
        .then((response) => {
          console.log(response);
          this.setState({ message: 'Registration successfull.You can now log in' });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ message: 'Email already in use' });
        });
    }
  }


  render() {
    return (
      <div>
        <h1 className="test">Login Page</h1>
        <p>{this.state.message}</p>
        <form onSubmit={this.startRegister}>
          <div>
            <input type="text" name="name" value={this.state.name} onChange={this.onNameChange} /><span>Your Name</span>
            <span>{this.state.nameError}</span>
          </div>
          <div>
            <input type="email" name="email" value={this.state.email} onChange={this.onEmailChange} /><span>Your Email</span>
          </div>
          <div>
            <input type="password" name="password" value={this.state.password} onChange={this.onPasswordChange} /><span>Your password</span>
            <span>{this.state.passwordError}</span>
          </div>
          <button>Register</button>
        </form>
        <Link to="/">Login</Link>
      </div>
    );
  }
}
