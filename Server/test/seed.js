const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const User = require('./../models/User');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const userThreeId = new ObjectID();
const users = [{
  _id: userOneId,
  name: 'User 1',
  email: 'user1@test.com',
  password: 'user1Password',
  tokens: [jwt.sign({ _id: userOneId }, process.env.JWT_SECRET).toString()],
  subscribedTo: ['Sport', 'Movies'],
}, {
  _id: userTwoId,
  name: 'User 2',
  email: 'user2@test.com',
  password: 'user2Password',
  tokens: [jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET).toString()],
  subscribedTo: ['Sport', 'Movies', 'Celebrity'],
}, {
  _id: userThreeId,
  name: 'User 3',
  email: 'user3@test.com',
  password: 'user3Password',
  tokens: [jwt.sign({ _id: userThreeId }, process.env.JWT_SECRET).toString()],
  subscribedTo: ['Movies', 'Celebrity', 'Songs'],
}];

const populateUsers = function populateUsers(done) {
  this.timeout(20000);
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();
    const userThree = new User(users[2]).save();
    return Promise.all([userOne, userTwo, userThree]);
  }).then(() => done())
    .catch(e => done(e));
};

module.exports = { users, populateUsers };
