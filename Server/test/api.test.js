const { httpServer } = require('./../server');
const expect = require('expect');
const request = require('supertest');
const {
  users, chats, messages, populateUsers, populateChats, populateMessages,
} = require('./seed.js');
const User = require('../models/User.js');

beforeEach(populateUsers);
beforeEach(populateChats);
beforeEach(populateMessages);

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
        expect(res.body.userId).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(email);
        expect(res.body.name).toBe('User 1');
        expect(res.body.subscribedTo).toEqual(users[0].subscribedTo);
        const expectedChatsData = {
          [chats[0]._id]: {
            creator: chats[0].creator.toHexString(),
            group: chats[0].group,
            maxNumOfUsers: chats[0].maxNumOfUsers,
            messages: [{
              _id: messages[0]._id.toHexString(),
              creator: users[1]._id.toHexString(),
              text: messages[0].text,
              time: `${messages[0]._id.getTimestamp()}`,
            }],
            title: chats[0].title,
            users: [
              {
                userId: users[1]._id.toHexString(),
                userName: users[1].name,
              },
              {
                userId: users[0]._id.toHexString(),
                userName: users[0].name,
                lastMessageSeen: messages[0]._id.toHexString(),
              },
            ],
          },
          [chats[1]._id]: {
            _id: chats[1]._id.toHexString(),
            creator: chats[1].creator.toHexString(),
            group: chats[1].group,
            maxNumOfUsers: chats[1].maxNumOfUsers,
            messages: [],
            title: chats[1].title,
            users: [
              {
                userId: users[0]._id.toHexString(),
                userName: users[0].name,

              },
              {
                userId: users[2]._id.toHexString(),
                userName: users[2].name,
              },
              {
                userId: users[1]._id.toHexString(),
                userName: users[1].name,
              },
            ],
          },
        };
        expect(res.body.chatsData).toEqual(expectedChatsData);
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
