const http = require('http');
const server = http.createServer();
const socketIO = require('socket.io');
const Redis = require('ioredis');

const { handleSocket } = require('./handleSocket.js');
const { handleNotif, handleComment } = require('./handleRedis.js');


// Listen to WS from frontend
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:8080',
    credentials: true,
  },
  allowEIO3: true,
})
io.on('connection', handleSocket);


// Setup Redis client
const customConfig = {
  host: process.env.REDIS_HOSTNAME ?? 'localhost', // change this
  port: process.env.REDIS_PORT ?? 6381, // change this
};
const redisClient = new Redis(customConfig);

// Listen to Redis 
redisClient.subscribe('WSS-comment');
redisClient.subscribe('WSS-notif');
redisClient.on('message', (channel, data) => {
  console.log("Connected to Redis")
  const payload = JSON.parse(data)
  if (channel === 'WSS-notif') {
    handleNotif(io, payload)
  } else if (channel === 'WSS-comment') {
    handleComment(io, payload)
  }
});


const port = process.env.WS_PORT ?? 3000
server.listen( port, () => {
    console.log(`Server listening on port ${port}`);
});
