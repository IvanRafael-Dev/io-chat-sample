const http = require('http');
const express = require('express');
const path = require('path');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Server', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Server', 'New user joined'));

  socket.on('join', (params, callback) => {
    
  });

  socket.on('createMessage', (message, cb) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    cb('Server response:');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('User', coords));
  });

  socket.on('disconnect', () => {
    console.log('A user was disconnected from server');
  });
})


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

