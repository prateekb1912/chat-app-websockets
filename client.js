document.addEventListener('DOMContentLoaded', ()=>{
    const webSocketClient = new WebSocket("ws://localhost:8000/");
    webSocketClient.onopen = () => {
        console.log("Connection Established");
        webSocketClient.send("HEEEYYY");
    };
});