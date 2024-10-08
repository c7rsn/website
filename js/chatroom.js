const socket = io('https://safe-caverns-06535-0283d8fae041.herokuapp.com/', {
    transports: ["websocket"],
    reconnectionAttempts: 5,
    timeout: 20000
}); // replace with your backend URL

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
        console.log("Chat Message Sent.");
        document.getElementById('chat-text').value = ''; // clear message input
    }
});

socket.on('msg_chat', function (data) {
    console.log("Chat Message Recieved.");
    const chatDisplay = document.querySelector('.chat-display');
    const msgElement = document.createElement('p');
    msgElement.innerHTML = `<b>${data.username}:</b> ${data.message}`;
    msgElement.style = "text-align: left; padding-left: 10px;";
    chatDisplay.appendChild(msgElement);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
});

socket.on('msg_sys', function (msg) {
    console.log("System Message Recieved.");
    const chatDisplay = document.querySelector('.chat-display');
    const msgElement = document.createElement('p');
    msgElement.innerHTML = msg;
    msgElement.style = "text-align: left; padding-left: 10px; opacity: 80%;";
    chatDisplay.appendChild(msgElement);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
});

socket.on('connect', () => {
    console.log('WebSocket connected:', socket.id);
});

socket.on('disconnect', (reason) => {
    console.log('Disconnected:', reason);
});

socket.on('reconnect_attempt', () => {
    console.log('Trying to reconnect...');
});

//Add online users number, send it through connect/disconnect
//Try to get usernames in connect/disconnect messages
//Load the last ten messages when you log in