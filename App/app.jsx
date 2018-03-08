import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import axios from 'axios';
import './Styles/styles.scss';
import Home from './Components/Home';
import AppRouter from './Routers/AppRouter';
import './Config/config';

let jsx = (<AppRouter />);
const token = localStorage.getItem('x-auth');
if (token) {
  axios.get('/auth', {
    headers: {
      'x-auth': token,
    },
  }).then((response) => {
    console.log(response);
    jsx = (<Home token={token} userData={response.data} />);
    ReactDOM.render(jsx, document.getElementById('react-app'));
  }).catch((err) => {
    console.log(err);
    ReactDOM.render(jsx, document.getElementById('react-app'));
  });
} else {
  ReactDOM.render(jsx, document.getElementById('react-app'));
}
