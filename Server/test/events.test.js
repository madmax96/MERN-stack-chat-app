const expect = require('expect');
const { sockets } = require('./wsServer.test');

describe('events', () => {
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
  });