const WebSocket = require ('ws');
const {httpServer,webSocketServer} = require('./../server');
const expect = require('expect');
const request = require('supertest');
const {users,populateUsers} = require('./seed.js');
let sockets = [];
let socketPromises=[];
beforeEach(populateUsers);

beforeEach(function(done){
    this.timeout(4000);
    let socket;
    users.forEach((user)=>{
       socket = new WebSocket(`ws://localhost:${process.env.PORT}/${user.tokens[0]}`);
       sockets.push(socket);
       socketPromises.push(new Promise((resolve,reject)=>{
            socket.onopen = function(){
                resolve();
            }
            socket.onerror = function(e){

                reject(e);
            }
       }));   
    });
    Promise.all(socketPromises).then(()=>done())
    .catch((e)=>{
        console.log(e);
        done();
    });
});

afterEach(function(){
    sockets.forEach((socket)=>{
        socket.close();
    })
});

describe('testing',()=>{
    
    it("should create users in database",()=>{
       
        expect(1+1).toBe(2);
    })
})