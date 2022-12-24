import asyncio
import websockets

clients = []

async def new_client(client_socket):
    clients.append(client_socket)
    websockets.broadcast(clients, f"New Client connected")
    
    while True:
        try:
            data = await client_socket.recv()
        except websockets.ConnectionClosedOK:
            break
        print(f"Client sent: {data}")

        websockets.broadcast(clients, f"{data}")

async def start_server():
    print("Server Started")
    async with websockets.serve(new_client, 'localhost', 8000):
        await asyncio.Future()


if __name__ == '__main__':
    asyncio.run(start_server()) 