class CustomEvents {
  constructor() {
    this.registeredEvents = {};
  }

  on(event, callback) {
    this.registeredEvents[event] = callback;
  }
  eventHandler(message, ws, wss) {
    const parsedMessage = JSON.parse(message);
    const handler = this.registeredEvents[parsedMessage.event];
    if (handler) {
      handler(parsedMessage.data, ws, wss);
    }
  }
}

module.exports = CustomEvents;
