const io = require('./app');

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

module.exports = {
  getApiAndEmit
}