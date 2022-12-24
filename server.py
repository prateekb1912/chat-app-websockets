import asyncio
import websockets

async def new_client(client_socket):
    print("Client connected")
    data = await client_socket.recv()

    print(f"Client sent: {data}")

async def start_server():
    print("Server Started")
    async with websockets.serve(new_client, 'localhost', 8000):
        await asyncio.Future()


if __name__ == '__main__':
    asyncio.run(start_server()) 