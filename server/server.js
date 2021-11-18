const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isString } = require('./utils/isString');
const { User } = require('./utils/User');

const users = new User();

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isString(params.name) || !isString(params.room)) {
      return callback('Name and room are required');
    }

    socket.join(params.room);

    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Server', `Welcome to ${params.room}!`));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Server', `New user has joined!`));

    callback();
  });

  socket.on('createMessage', (message, cb) => {
    console.log('createMessage', message);
    const user = users.getUserById(socket.id);
    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    cb('Server response:');
  });

  socket.on('createLocationMessage', (coords) => {
    const user = users.getUserById(socket.id);
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
  });

  socket.on('updateUserList', () => {

  })

  socket.on('disconnect', () => {
    const client = users.removeUser(socket.id);

    if(client) {
      io.to(client.room).emit('updateUserList', users.getUserList(client.room));
      io.to(client.room).emit('newMessage', generateMessage('Server', `${client.name} has left ${client.room} chat room!`));
    }
    console.log('A user was disconnected from server');
  });
})


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

