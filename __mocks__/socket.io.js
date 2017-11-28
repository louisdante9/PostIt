const EventEmitter = require('events').EventEmitter;

/* global jest */

const mockSocket = () => {
  return {
    toServer: new EventEmitter(),
    toClient: new EventEmitter(),
    disconnect: () => {
      this.toServer.emit('disconnect');
    },
    emit: () => {
      jest.genMockFunction();
    },
    on: () => {
      jest.genMockFunction();
    },
    off: () => {
      jest.genMockFunction();
    }
  };
};

module.exports = mockSocket;