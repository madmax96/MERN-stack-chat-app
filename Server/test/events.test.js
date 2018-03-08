const WebSocket = require('ws');
const { httpServer, webSocketServer } = require('./../server');
const expect = require('expect');
const request = require('supertest');
const { users, populateUsers } = require('./seed.js');
const User = require('../models/User.js');

const sockets = [];
const socketPromises = [];

beforeEach(populateUsers);

describe('POST /register', () => {
  it('should create a user', (done) => {
    const email = 'example@example.com';
    const password = '123mnb!';
    const name = 'Mocha testing';
    request(httpServer)
      .post('/register')
      .send({ email, password, name })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        User.findOne({ email }).then((user) => {
          expect(typeof user).toBe('object');
          expect(user.password).not.toBe(password);
          done();
        });
      });
  });

  it('should return validation errors if request invalid', (done) => {
    request(httpServer)
      .post('/register')
      .send({
        email: 'and',
        password: '123',
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    request(httpServer)
      .post('/register')
      .send({
        email: users[0].email,
        password: 'Password123!',
      })
      .expect(400)
      .end(done);
  });
});

describe('POST login', () => {
  it('should login  a user and return token and user info', (done) => {
    const { email, password } = users[0];

    request(httpServer)
      .post('/login')
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeDefined();
        expect(res.body._id).toBeDefined();
        expect(res.body.email).toBe(email);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[0]._id).then((user) => {
          expect(user.tokens[1]).toBe(res.headers['x-auth']);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not login  a user ', (done) => {
    const email = 'wrong@email.com';
    const password = 'wrong pass';

    request(httpServer)
      .post('/login')
      .send({ email, password })
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('WebSocket Server connection', () => {
  it('should authorise users and connect them to WebSocket Server', function wssTest(done) {
    this.timeout(10000);
    let socket;
    users.forEach((user) => {
      socket = new WebSocket(`ws://localhost:${process.env.PORT}/${user.tokens[0]}`);
      sockets.push(socket);
      socketPromises.push(new Promise((resolve, reject) => {
        socket.onopen = function onopen() {
          resolve();
        };
        socket.onerror = function onerror(e) {
          reject(e);
        };
      }));
    });
    Promise.all(socketPromises).then(() => {
      const userNames = [];
      expect(webSocketServer.clients.size).toBe(3);
      webSocketServer.clients.forEach((wsClient) => {
        userNames.push(wsClient.user.name);
      });
      expect(userNames.includes('User 1') && userNames.includes('User 2') && userNames.includes('User 3'))
        .toBe(true);
      done();
    })
      .catch((e) => {
        console.log(e);
        done();
      });
  });
});

// end to end testing
describe('events', () => {
  it('should create new chat and send notifications correctly', (done) => {
    sockets[0].send(JSON.stringify({
      event: 'newChat',
      data: { group: 'Sport', title: 'mocha testing', maxNumOfUsers: 6 },
    }));
    sockets[1].onmessage = (message) => {
      expect(typeof message.data).toBe('string'); // not finished testing
      done();
    };
  });
});

describe('Logout', () => {
  it('should disconect user from Wss', () => {

  });
});

