import asyncio
import json
from datetime import datetime, tzinfo

import websockets

clients = {}

async def client_handler(client_socket):
    while True:
        async for message in client_socket:
            message = json.loads(message)
            if message['type'] == 'join':
                username = message['username']
                clients[username] = client_socket

                send_message = {
                    "user": "Server",
                    "text": f"{username} has entered the chat!",
                    "time": datetime.now().strftime("%H:%M")
                }
            elif message['type'] == 'message':
                username = message['username']
                content = message['content']

                send_message = {
                    "user": username,
                    "text": content,
                    "time": datetime.now().strftime("%H:%M")
                }
            
            websockets.broadcast(list(clients.values()), json.dumps(send_message))

async def start_server():
    print("Server Started")
    async with websockets.serve(client_handler, 'localhost', 8000):
        await asyncio.Future()


if __name__ == '__main__':
    asyncio.run(start_server())