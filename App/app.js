import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss'; 
import configureStore from './Store/configureStore';
import axios from 'axios';
import config from './Config/config';
import Ws from './utils/ws';
const store = configureStore();

const jsx = (<Provider store={store}>
                <AppRouter/>
            </Provider>);

ReactDOM.render(jsx,document.getElementById('react-app'));

const ws = new Ws(config.url,'token_key_here');
ws.connect().then(()=>{
    console.log("connected successfully");
    ws.on('ws_close',()=>{
        console.log('Closed')
    });
  
    ws.on('newMessage',(messageData)=>{
        console.log(messageData);
    });
    ws.emmit('userMessage',{from:'madmax',text:'heyyy'});
},(error)=>{
    console.log('rejected',error);
})