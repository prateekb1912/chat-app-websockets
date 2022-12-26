let params = new URLSearchParams(location.search);
username = params.get('username');


const chatMessages = document.getElementById('chatMessages')
const submitForm = document.getElementById('chat-form')

const webSocketClient = new WebSocket('ws://localhost:8000/');

document.addEventListener("DOMContentLoaded", () =>{
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
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };        

});

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let message = e.target.messageInput.value;
    message = message.trim();

    let data = {
        'type': 'message',
        'username': username,
        'content': message
    }

    console.log(data)

    webSocketClient.send(JSON.stringify(data));

    e.target.elements.messageInput.value = "";
    e.target.elements.messageInput.focus();
});


function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.user;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}
