const socket = io();
socket.on('connect', () => {
  console.log('Connected to server');
  
});
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  const template = document.querySelector('#message-template').innerHTML;
  const msgFormattedTime = moment(message.createdAt).format('HH:mm');
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: msgFormattedTime
  });
  console.log(html);
  const div = document.createElement('div');
  div.innerHTML = html;
  document.querySelector('#messages').appendChild(div);
});

socket.on('newLocationMessage', (message) => {
  const template = document.querySelector('#message-location-template').innerHTML;
  const msgFormattedTime = moment(message.createdAt).format('HH:mm');
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: msgFormattedTime
  });
  const div = document.createElement('div');
  div.innerHTML = html;
  document.querySelector('#messages').appendChild(div);
})

document.querySelector('#submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const message = document.querySelector('input[name=message]').value;
  socket.emit('createMessage', {
    from: 'User',
    text: message
  }, (data) => {
    console.log(`${data} got it!`)
  });
  document.querySelector('input[name=message]').value = '';
});

document.querySelector('#send-location-btn').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => alert('Unable to fetch location'));
});