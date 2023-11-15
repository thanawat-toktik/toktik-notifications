const handleSocket = (socket) => {
  socket.on('disconnect', () => {
  });
}

module.exports = {
  handleSocket
};