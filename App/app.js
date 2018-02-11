import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Components/Home';
import axios from 'axios';
import AppRouter, {history} from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss'; 
import config from './Config/config';

let jsx = (<AppRouter/>);
let token;
if(token = localStorage.getItem("x-auth")){
    axios.get('/auth',{
        headers:{
            "x-auth":token
        }
    }).then((response)=>{
        console.log(response)
        jsx = (<Home token={token} userData = {response.data}/>);
        ReactDOM.render(jsx,document.getElementById('react-app'));
    }).catch((err)=>{
        console.log(err);
        ReactDOM.render(jsx,document.getElementById('react-app'));
    });
    
}else{
    ReactDOM.render(jsx,document.getElementById('react-app'));
}
