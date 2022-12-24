let params = new URLSearchParams(location.search)
username = params.get('username')

const webSocketClient = new WebSocket('ws://localhost:8000/')

webSocketClient.onopen = () => {
    console.log("{$username} connected to WS");
    data = {
        'type': 'join',
        'username': username,
    };
    webSocketClient.send(JSON.stringify(data));
};

webSocketClient.onmessage = (message) => {
    const data = JSON.parse(message.data);
    console.log(data);

    outputMessage(data);
};


function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.user;
    // p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}