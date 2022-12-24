import asyncio
import websockets

clients = []

async def client_handler(client_socket):
    clients.append(client_socket)
    websockets.broadcast(clients, f"New Client connected")

    while True:
        async for message in client_socket:
            
            print(f"Client sent: {message}")
            websockets.broadcast(clients, f"{message}")

async def start_server():
    print("Server Started")
    async with websockets.serve(client_handler, 'localhost', 8000):
        await asyncio.Future()


if __name__ == '__main__':
    asyncio.run(start_server()) 