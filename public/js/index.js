const socket = io();
socket.on('connect', () => {
  console.log('Connected to server');
  
});
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('New message', message);
});

socket.emit('createMessage', {
    from: 'Carl Sagan',
    text: 'We are all made of stardusts'
}, (data) => {
  console.log(`${data} got it!`)
});