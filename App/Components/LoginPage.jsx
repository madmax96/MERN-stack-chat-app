import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Home from './Home';

export default class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordError: '',
      authError: '',
    };
  }


  onEmailChange(e) {
    const email = e.target.value;
    this.setState({ email });
  }

  onPasswordChange(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  startLogin(e) {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    if (password.length < 6) {
      this.setState({ passwordError: 'Password must have minimum 6 characters' });
      return;
    }
    axios.post('/login', { email, password })
      .then((response) => {
        console.log(response);
        const token = response.headers['x-auth'];
        localStorage.setItem('x-auth', token);
        // if login successfull
        ReactDOM.render(<Home token={token} userData={response.data} />, document.getElementById('react-app'));
      })
      .catch((err) => {
        console.log(err);
        this.setState({ authError: 'Wrong email or password' });
      });
  }


  render() {
    return (
      <div>
        <h1 className="test">Login Page</h1>
        <p>{this.state.authError}</p>
        <form onSubmit={this.startLogin}>
          <div>
            <input type="email" name="email" value={this.state.email} onChange={this.onEmailChange} />
          </div>
          <div>
            <input type="password" name="password" value={this.state.password} onChange={this.onPasswordChange} />
            <span>{this.state.passwordError}</span>
          </div>
          <button>Log in</button>
        </form>
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

