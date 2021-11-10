const http = require('http');
const express = require('express');
const path = require('path');

const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

