const handleSocket = (socket) => {
  console.log(`New connection: ${socket.id}`)
  socket.on('disconnect', () => {
  });
}

module.exports = {
  handleSocket
};