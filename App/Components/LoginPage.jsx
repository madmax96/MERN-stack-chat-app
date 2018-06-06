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
      error: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.startLogin = this.startLogin.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }
  startLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (password.length < 6) {
      this.setState({ error: 'Invalid credentials! Login failed' });
      return;
    }
    axios.post('/login', { email, password })
      .then((response) => {
        const token = response.headers['x-auth'];
        localStorage.setItem('x-auth', token);
        ReactDOM.render(
          <Home token={token} userData={response.data} />,
          document.getElementById('react-app'),
        );
      })
      .catch((err) => {
        if (err.response.status >= 500) {
          this.setState({ error: 'Our service is down.Please try later' });
        } else {
          this.setState({ error: 'Invalid credentials! Login failed' });
        }
      });
  }

  render() {
    let errorBox;
    if (this.state.error) {
      errorBox = (
        <div className="alert alert-danger" role="alert">
          {this.state.error}
        </div>);
    }
    return (
      <div className="row row-align_center full-height">
        <div className="col-1/4 text-center">
          <form onSubmit={this.startLogin}>
            <img className="mb-4" src="" alt="" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            {errorBox}
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
            />
            <button className="btn btn-lg btn-primary btn-block margin-top-small" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
          </form>
          <Link to="/register" href="/register" className="btn btn-success">Register</Link>
        </div>
      </div>
    );
  }
}

