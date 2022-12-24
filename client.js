document.addEventListener('DOMContentLoaded', ()=>{
    const webSocketClient = new WebSocket("ws://localhost:8000/");
    
    const messageInput = document.querySelector("[name=messageInput]");
    const sendBtn = document.querySelector("[name=sendButton]");
    
    webSocketClient.onopen = () => {
        console.log("Connection Established");

        sendBtn.onclick = () => {
            message = messageInput.value;
            webSocketClient.send(message);
        };

        webSocketClient.onmessage = (message) => {
            console.log(message.data);
        };
    };

});