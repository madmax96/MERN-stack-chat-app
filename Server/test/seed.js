const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const User = require('./../models/User');
const ChatRoom = require('./../models/ChatRoom');
const Message = require('./../models/Message');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const userThreeId = new ObjectID();

const chatOneId = new ObjectID();
const chatTwoId = new ObjectID();
const chatThreeId = new ObjectID();

const messageOneId = new ObjectID();
// Users seed
const users = [
  {
    _id: userOneId,
    name: 'User 1',
    email: 'user1@test.com',
    password: 'user1Password',
    tokens: [jwt.sign({ _id: userOneId }, process.env.JWT_SECRET).toString()],
    subscribedTo: ['Sport', 'Movies'],
    ChatRooms: [
      {
        chatId: chatOneId,

      }, {
        chatId: chatTwoId,

      }],
  },
  {
    _id: userTwoId,
    name: 'User 2',
    email: 'user2@test.com',
    password: 'user2Password',
    tokens: [jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET).toString()],
    subscribedTo: ['Sport', 'Movies', 'Celebrity'],
    ChatRooms: [
      {
        chatId: chatOneId,

      }, {
        chatId: chatTwoId,

      }, {
        chatId: chatThreeId,
      },
    ],
  },
  {
    _id: userThreeId,
    name: 'User 3',
    email: 'user3@test.com',
    password: 'user3Password',
    tokens: [jwt.sign({ _id: userThreeId }, process.env.JWT_SECRET).toString()],
    subscribedTo: ['Movies', 'Celebrity', 'Songs'],
    ChatRooms: [
      {
        chatId: chatTwoId,

      }],
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

// Chats seed

const chats = [
  {
    _id: chatOneId,
    creator: userOneId,
    group: 'Sport',
    title: 'Talk about kobe vs Lebron James',
    maxNumOfUsers: 5,
    users: [{
      userId: userTwoId,
      userName: users[1].name,
    },
    {
      userId: userOneId,
      userName: users[0].name,
      lastMessageSeen: messageOneId,
    }],
  },

  {
    _id: chatTwoId,
    creator: userTwoId,
    group: 'Movies',
    title: 'Talk about dwayne Jhonson movies',
    maxNumOfUsers: 8,
    users: [
      {
        userId: userOneId,
        userName: users[0].name,

      },
      {
        userId: userThreeId,
        userName: users[2].name,
      },
      {
        userId: userTwoId,
        userName: users[1].name,
      },
    ],
  },

  {
    _id: chatThreeId,
    creator: userTwoId,
    group: 'Sport',
    title: 'Talk about football world cup',
    maxNumOfUsers: 8,
    users: [
      {
        userId: userTwoId,
        userName: users[1].name,
      },
    ],
  },
];

const populateChats = function populateChats(done) {
  this.timeout(20000);
  ChatRoom.remove({}).then(() => {
    const chatOne = new ChatRoom(chats[0]).save();
    const chatTwo = new ChatRoom(chats[1]).save();
    const chatThree = new ChatRoom(chats[2]).save();
    return Promise.all([chatOne, chatTwo, chatThree]);
  }).then(() => done())
    .catch(e => done(e));
};

// seed messages
const messages = [

  {
    _id: messageOneId,
    creator: userTwoId,
    chatId: chatOneId,
    text: 'testing seen message',
  },
];

const populateMessages = function populateMessages(done) {
  this.timeout(20000);
  Message.remove({}).then(() => {
    const messageOne = new Message(messages[0]).save();

    messageOne
      .then(() => done())
      .catch(e => done(e));
  });
};

module.exports = {
  users, populateUsers, chats, populateChats, messages, populateMessages,
};
