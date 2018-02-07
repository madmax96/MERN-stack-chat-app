import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss'; 
import configureStore from './Store/configureStore';
import axios from 'axios';
//import Ws from 'utils/ws';
const store = configureStore();

const jsx = (<Provider store={store}>
                <AppRouter/>
            </Provider>);

ReactDOM.render(jsx,document.getElementById('react-app'));
console.log(process.env.URL);
const socket = new WebSocket('ws://localhost:3000');
socket.onopen = function(){
    console.log('open');
    socket.send('test test')
}

axios.post(`${process.env.URL}/login`).then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
})
