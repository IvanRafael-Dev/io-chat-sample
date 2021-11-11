const socket = io();
socket.on('connect', () => {
  console.log('Connected to server');
  
});
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('New message', message);
  const li = document.createElement('li')
  li.innerText = `${message.from}: ${message.text}`;
  document.querySelector('body').appendChild(li);
});

socket.on('newLocationMessage', (message) => {
  console.log('New location message', message);
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.setAttribute('target', '_blank');
  a.setAttribute('href', message.url);
  li.innerText = `${message.from}: `;
  a.innerHTML = 'My current location';
  li.appendChild(a);
  document.querySelector('body').appendChild(li);
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