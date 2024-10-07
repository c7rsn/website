const socket = io('https://safe-caverns-06535-0283d8fae041.herokuapp.com/'); // replace with your backend URL

document.getElementById('chat-submit').addEventListener('click', function (e) {
    e.preventDefault();
    const username = document.getElementById('chat-name').value;
    const message = document.getElementById('chat-text').value;

    if (username && message) {
        localStorage['chatroom_username'] = username;
        socket.emit('chatMessage', { username, message });
        document.getElementById('chat-text').value = ''; // clear message input
    }
});

socket.on('message', function (data) {
    const chatDisplay = document.querySelector('.chat-display');
    const msgElement = document.createElement('p');
    msgElement.innerHTML = `<b>${data.username}:</b> ${data.message}`;
    msgElement.style = "text-align: left; padding-left: 10px;";
    chatDisplay.appendChild(msgElement);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
});


