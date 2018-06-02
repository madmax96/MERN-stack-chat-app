/*eslint-disable */
const expect = require('expect');
const { sockets } = require('./wsServer.test');
const {
  chats,users,messages,populateUsers,populateChats,populateMessages
} = require('./seed.js');
const User = require('./../models/User');

beforeEach(populateUsers);
beforeEach(populateChats);
beforeEach(populateMessages);
describe('tests for events', () => {
  it('should create new chat and send notifications correctly', (done) => {
    sockets[0].send(JSON.stringify({
      event: 'newChat',
      data: { group: 'Sport', title: 'mocha testing', maxNumOfUsers: 6 },
    }));
    sockets[1].onmessage = (message) => {
      expect(typeof message.data).toBe('string');
      const parsedData = JSON.parse(message.data);
      expect(parsedData.event).toBe('newChat');
      expect(typeof parsedData.data.chatId).toBe('string');
      done();
    };
  });
  it('should create new message and send it to group', function(done) {
    this.timeout(5000);
    sockets[0].send(JSON.stringify({
      event: 'newMessage',
      data: { text: 'Testing from mocha:D !!!', chatId: chats[1]._id },
    }));
    let promises = [];
    sockets.forEach((socket) => {
      const promise = new Promise((resolve) => {
        socket.onmessage = (message) => {
          expect(typeof message.data).toBe('string');
          const parsedData = JSON.parse(message.data);
          expect(parsedData.event).toBe('newMessage');
          expect(typeof parsedData.data.chatId).toBe('string');
          expect( parsedData.data.text).toBe('Testing from mocha:D !!!');
          expect( parsedData.data.creator).toBe(users[0]._id.toHexString());
          expect(typeof parsedData.data.time).toBe('string');
          expect(typeof parsedData.data._id).toBe('string');
          resolve();
        };
      });
      promises.push(promise);
    });
    Promise.all(promises).then(() => done()).catch(e => done(e));
  });

  it('should send message when new user join chat',function(done){
    this.timeout(5000);
    sockets[2].send(JSON.stringify({
      event: 'userJoinedChat',
      data: { chatId: chats[0]._id },
    }));

    let promises = [];
    sockets.forEach((socket) => {
      const promise = new Promise((resolve) => {
        socket.onmessage = (message) => {
          expect(typeof message.data).toBe('string');
          const parsedData = JSON.parse(message.data);
          expect(parsedData.event).toBe('userJoinedChat');
          expect(typeof parsedData.data.chatId).toBe('string');
          expect( parsedData.data.text).toBe('User User 3 joined chat');
          expect( parsedData.data.creator).toBe('000000000000000000000000');
          expect( parsedData.data.user.name).toBe('User 3');
          expect( typeof parsedData.data.user.id).toBe('string');
          expect(typeof parsedData.data.time).toBe('string');
          expect(typeof parsedData.data._id).toBe('string');
          resolve();
        };
      });
      promises.push(promise);
    });

    Promise.all(promises).then(() => done()).catch(e => done(e));

  })

  it('should subscribe successfully' , function(done){
    this.timeout(5000);
    sockets[0].send(JSON.stringify({
      event:'userSubscribeEvent',
      data: {
        groupName: 'Celebrity',
        subscribe: true,
      }
    }));

    sockets[1].send(JSON.stringify({
      event:'userSubscribeEvent',
      data: {
        groupName: 'Celebrity',
        subscribe: false,
      }
    }));
    setTimeout(()=>{
      const promise1 = User.findById(users[0]._id).then((user)=>{

        expect(user.subscribedTo).toContain('Celebrity');
      })
      const promise2 = User.findById(users[1]._id).then((user)=>{

        expect(user.subscribedTo.includes('Celebrity')).toBe(false);
      })

      Promise.all([promise1,promise2])
      .then(()=>done())
      .catch((e)=>done(e));

    },1000)
  })

it('should send messageSeenEvent successfully' , function(done){
    this.timeout(5000);
    sockets[0].send(JSON.stringify({
      event:'messageSeenEvent',
      data: {
        messageId: messages[0]._id,
        chatId: chats[0]._id,
      }
    }));
    let promises = [];
    //we expect every one of 3 users to receive notif
    //becaouse we added User 3 to chat one in User joined chat test
    sockets.forEach((socket,i) => {
        const promise = new Promise((resolve) => {
          socket.onmessage = (message) => {
            expect(typeof message.data).toBe('string');
            const parsedData = JSON.parse(message.data);
            expect(parsedData.event).toBe('messageSeenEvent');
            expect( parsedData.data.chatId).toBe(chats[0]._id.toHexString());
            expect( parsedData.data.userId).toBe(users[0]._id.toHexString());
            expect( parsedData.data.messageId).toBe(messages[0]._id.toHexString());
            resolve();
          };
        });
        promises.push(promise);
    }
    );
    Promise.all(promises).then(() => done()).catch(e => done(e));

  })

  it('should logout user successfully' , function(done){
    this.timeout(5000);
    sockets[0].send(JSON.stringify({
      event:'logoutEvent'
    }));
    let socket = sockets[0];
    new Promise((resolve) => {
          socket.onmessage = (message) => {
            expect(typeof message.data).toBe('string');
            const parsedData = JSON.parse(message.data);
            expect(parsedData.event).toBe('logoutConfirmation');
            expect( parsedData.data.status).toBe(true);
            resolve();
          };
        }).then(()=>done());
  })
});
