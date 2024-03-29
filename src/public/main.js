const socket = io('http://localhost:8080/chat');
const msgBox = document.getElementById('exampleFormControlTextarea1');
const msgCont = document.getElementById('data-container');
const username = document.getElementById('username');

//get old messages from the server
const messages = [];
function getMessages() {
  fetch('http://localhost:8080/api/chat')
    .then((response) => response.json())
    .then((data) => {
      loadDate(data);
      data.forEach((el) => {
        messages.push(el);
      });
    })
    .catch((err) => console.error(err));
}
getMessages();

//When a user press the enter key, send message.
msgBox.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    sendMessage({ username: username.value, msg: e.target.value });
    e.target.value = '';
  }
});

//Display messages to the users
function loadDate(data) {
  let messages = '';
  data.map((message) => {
    messages += ` <li class="bg-secondary p-2 rounded mb-2 text-light">
      <span class="fw-bolder">${message.username}</span>
      ${message.msg}
    </li>`;
  });
  msgCont.innerHTML = messages;
}

//socket.io
//emit sendMessage event to send message
function sendMessage(message) {
  socket.emit('sendMessage', message);
}
//Listen to recMessage event to get the messages sent by users
socket.on('recMessage', (message) => {
  messages.push(message);
  loadDate(messages);
});
