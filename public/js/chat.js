const socket = io();

const makeNoise = () => {
  const a = new AudioContext();
  const o = a.createOscillator();
  const g = a.createGain();
  o.connect(g);
  o.frequency.value = 440;
  o.detune.value = 1000;
  g.connect(a.destination);
  g.gain.value = 0.02;
  o.start();
  o.stop(a.currentTime + 0.005);
  console.log('chamado');
}

const scrollToBottom = () => {
  const messages = document.querySelector('#messages');
  const newMessage = messages.lastElementChild;
  newMessage.scrollIntoView();
};

socket.on('connect', () => {
  const params = JSON
    .parse('{"' + decodeURI(location.search.substring(1))
      .replace(/&/g, '","')
      .replace(/\+/g, ' ')
      .replace(/=/g, '":"') +'"}');
  
  socket.emit('join', params, (err) => {
    if (err) {
      alert(err);
      location.href = '/';
    } else {
      console.log('No error');
    }
  });  
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('updateUserList', (users) => {
  console.log(users);
  const ol = document.createElement('ol');
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerHTML = user;
    ol.appendChild(li);
  });
  document.querySelector('#users').innerHTML = '';
  document.querySelector('#users').appendChild(ol);

});

socket.on('newMessage', (message) => {
  const template = document.querySelector('#message-template').innerHTML;
  const msgFormattedTime = moment(message.createdAt).format('HH:mm');
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: msgFormattedTime
  });
  const div = document.createElement('div');
  div.innerHTML = html;
  document.querySelector('#messages').appendChild(div);
  scrollToBottom();
  makeNoise();
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
  scrollToBottom();
  makeNoise();
})

document.querySelector('#submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const message = document.querySelector('input[name=message]').value;
  socket.emit('createMessage', {
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