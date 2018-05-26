const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const User = require('./../models/User');
const ChatRoom = require('./../models/ChatRoom');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const userThreeId = new ObjectID();

const chatOneId = new ObjectID();
const chatTwoId = new ObjectID();

//Users seed
const users = [
  {
    _id: userOneId,
    name: 'User 1',
    email: 'user1@test.com',
    password: 'user1Password',
    tokens: [jwt.sign({ _id: userOneId }, process.env.JWT_SECRET).toString()],
    subscribedTo: ['Sport', 'Movies'],
    ChatRooms:[
            {
              chatId:chatOneId,
              isCreator:true
            },{
              chatId:chatTwoId,
              isCreator:false
            }]
  },
  {
    _id: userTwoId,
    name: 'User 2',
    email: 'user2@test.com',
    password: 'user2Password',
    tokens: [jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET).toString()],
    subscribedTo: ['Sport', 'Movies', 'Celebrity'],
    ChatRooms:[
      {
        chatId:chatOneId,
        isCreator:false
      },{
        chatId:chatTwoId,
        isCreator:true
      }]
  },
 {
    _id: userThreeId,
    name: 'User 3',
    email: 'user3@test.com',
    password: 'user3Password',
    tokens: [jwt.sign({ _id: userThreeId }, process.env.JWT_SECRET).toString()],
    subscribedTo: ['Movies', 'Celebrity', 'Songs'],
    ChatRooms:[
      {
        chatId:chatTwoId,
        isCreator:false
      }]
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

//Chats seed

const chats = [
  {
    _id:chatOneId,
    creator: userOneId,
    group: 'Sport',
    title:'Talk about kobe vs Lebron James',
    maxNumOfUsers:5,
    users: [{
      userId: userTwoId
    }],
  },

  {
    _id:chatTwoId,
    creator: userTwoId,
    group: 'Movies',
    title:'Talk about dwayne Jhonson movies',
    maxNumOfUsers:8,
    users: [
      {
        userId: userOneId
      },
      {
        userId: userThreeId
      }
    ]
  }
]

const populateChats = function populateUsers(done) {
  this.timeout(20000);
  ChatRoom.remove({}).then(() => {
    const chatOne = new ChatRoom(chats[0]).save();
    const chatTwo = new ChatRoom(chats[1]).save();
   
    return Promise.all([chatOne, chatTwo]);
  }).then(() => done())
    .catch(e => done(e));
};

module.exports = { users, populateUsers ,chats,populateChats};
