const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // When a user plays the video, broadcast it to others
  socket.on('play', () => {
    socket.broadcast.emit('play');
  });

  // When a user pauses the video, broadcast it to others
  socket.on('pause', () => {
    socket.broadcast.emit('pause');
  });

  // Synchronize the current time of the video
  socket.on('timeUpdate', (time) => {
    socket.broadcast.emit('timeUpdate', time);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
