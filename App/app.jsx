
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import 'normalize.css/normalize.css';
import './Config/config';
import Dashboard from './Components/Dashboard';
import AppRouter from './Routers/AppRouter';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Styles/styles.scss';


let jsx = (<AppRouter />);
const token = localStorage.getItem('x-auth');
if (token) {
  axios.get('/auth', {
    headers: {
      'x-auth': token,
    },
  }).then((response) => {
    jsx = (<Dashboard token={token} userData={response.data} />);
    ReactDOM.render(jsx, document.getElementById('react-app'));
  }).catch((err) => {
    console.log(err);
    ReactDOM.render(jsx, document.getElementById('react-app'));
  });
} else {
  ReactDOM.render(jsx, document.getElementById('react-app'));
}
