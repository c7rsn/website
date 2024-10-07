const socket = io('https://git.heroku.com/safe-caverns-06535.git'); // replace with your backend URL

document.getElementById('chat-submit').addEventListener('click', function (e) {
    e.preventDefault();
    const username = document.getElementById('chat-name').value;
    const message = document.getElementById('chat-text').value;

    if (username && message) {
        socket.emit('chatMessage', { username, message });
        document.getElementById('chat-text').value = ''; // clear message input
    }
});

socket.on('message', function (data) {
    const chatDisplay = document.querySelector('.chat-display');
    const msgElement = document.createElement('p');
    msgElement.textContent = `${data.username}: ${data.message}`;
    chatDisplay.appendChild(msgElement);
});