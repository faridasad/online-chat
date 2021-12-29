/* const socket = io.connect('http://localhost:3000/') // for use locally */
const socket = io.connect('https://node-online-chat-app.herokuapp.com/')


const sender = document.getElementById('sender')
const message = document.getElementById('message')
const submitBtn = document.getElementById('submitBtn')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')

submitBtn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        sender: sender.value,
    })
})

socket.on('chat', data => {
    feedback.innerHTML = ''
    output.innerHTML += '<p><strong>' + data.sender + ': </strong>' + data.message + '</p>'
    message.value = '';
})

message.addEventListener('keypress', () => {
    socket.emit('typing', sender.value)
})

socket.on('typing', data => {
    feedback.innerHTML = '<p>' + data + ' typing...</p>'
})


var input = document.getElementById("message");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("submitBtn").click();
  }
});