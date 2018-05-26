// const WebSocket = require('ws');
// const { httpServer } = require('./../server');
// const expect = require('expect');
// const request = require('supertest');
// const { users, populateUsers } = require('./seed.js');
// const User = require('../models/User.js');

// beforeEach(populateUsers);

// describe('POST /register', () => {
//   it('should create a user', (done) => {
//     const email = 'example@example.com';
//     const password = '123mnb!';
//     const name = 'Mocha testing';
//     request(httpServer)
//       .post('/register')
//       .send({ email, password, name })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body).toEqual({});
//       })
//       .end((err) => {
//         if (err) {
//           return done(err);
//         }

//         User.findOne({ email }).then((user) => {
//           expect(typeof user).toBe('object');
//           expect(user.password).not.toBe(password);
//           done();
//         });
//       });
//   });

//   it('should return validation errors if request invalid', (done) => {
//     request(httpServer)
//       .post('/register')
//       .send({
//         email: 'and',
//         password: '123',
//       })
//       .expect(400)
//       .end(done);
//   });

//   it('should not create user if email in use', (done) => {
//     request(httpServer)
//       .post('/register')
//       .send({
//         email: users[0].email,
//         password: 'Password123!',
//       })
//       .expect(400)
//       .end(done);
//   });
// });

// describe('POST login', () => {
//   it('should login  a user and return token and user info', (done) => {
//     const { email, password } = users[0];

//     request(httpServer)
//       .post('/login')
//       .send({ email, password })
//       .expect(200)
//       .expect((res) => {
//         expect(res.headers['x-auth']).toBeDefined();
//         expect(res.body._id).toBeDefined();
//         expect(res.body.email).toBe(email);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         User.findById(users[0]._id).then((user) => {
//           expect(user.tokens[1]).toBe(res.headers['x-auth']);
//           done();
//         }).catch(e => done(e));
//       });
//   });

//   it('should not login  a user ', (done) => {
//     const email = 'wrong@email.com';
//     const password = 'wrong pass';

//     request(httpServer)
//       .post('/login')
//       .send({ email, password })
//       .expect(400)
//       .expect((res) => {
//         expect(res.body).toEqual({});
//       })
//       .end(done);
//   });
// });
