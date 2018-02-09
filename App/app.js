import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss'; 
import configureStore from './Store/configureStore';
import axios from 'axios';
import config from './Config/config';

const store = configureStore(); 
//console.log(store.getState());
const websocket = store.getState().websocket;
websocket.dispatch = store.dispatch;

import newMessageEvent from './eventControllers/newMessageEvent';
import newChatEvent from './eventControllers/newChatEvent';
import userJoinedChatEvent from './eventControllers/userJoinedChatEvent';
import userLeftChatEvent  from './eventControllers/userLeftChatEvent';
import adminClosedChatEvent from './eventControllers/adminClosedChatEvent';



websocket.on('newMessage',newMessageEvent);
websocket.on('newChat',newChatEvent);
websocket.on('userJoinedChat',userJoinedChatEvent);
websocket.on('userLeftChat',userLeftChatEvent);
websocket.on('adminClosedChat',adminClosedChatEvent);

const jsx = (<Provider store={store}>
                <AppRouter/>
            </Provider>);

ReactDOM.render(jsx,document.getElementById('react-app'));

