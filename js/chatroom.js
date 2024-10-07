const socket = io('https://safe-caverns-06535-0283d8fae041.herokuapp.com/'); // replace with your backend URL

function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => (map[match]));
}

document.getElementById('chat-submit').addEventListener('click', function (e) {
    e.preventDefault();
    const username = sanitize(document.getElementById('chat-name').value);
    const message = sanitize(document.getElementById('chat-text').value);

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

socket.on('connected', function () {
    const chatDisplay = document.querySelector('.chat-display');
    const msgElement = document.createElement('p');
    msgElement.innerHTML = "New User Connected.";
    msgElement.style = "text-align: left; padding-left: 10px; opacity: 80%;";
    chatDisplay.appendChild(msgElement);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
});

