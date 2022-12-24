document.addEventListener('DOMContentLoaded', ()=>{
    const webSocketClient = new WebSocket("ws://localhost:8000/");

    const messagesCont = document.querySelector(".messages");
    const messageInput = document.querySelector("[name=messageInput]");
    const sendBtn = document.querySelector("[name=sendButton]");
    const quitBtn = document.querySelector("[name=quitButton]");

    webSocketClient.onopen = () => {
        console.log("Connection Established");

        sendBtn.onclick = () => {
            message = messageInput.value;
            webSocketClient.send(message);
        };

        webSocketClient.onmessage = (message) => {
            const newMessage = document.createElement('div');
            newMessage.className = 'message';
            newMessage.innerHTML = message.data;
            messagesCont.appendChild(newMessage);
        };

        webSocketClient.onclose = () => {
            console.log("Closing connection");
        };

        quitBtn.onclick = () => {
            webSocketClient.close(1000);
        };
    };

});