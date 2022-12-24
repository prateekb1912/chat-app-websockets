import asyncio
import websockets

async def new_client(client_socket):
    print("Client connected")
    while True:
        try:
            data = await client_socket.recv()
        except websockets.ConnectionClosedOK:
            break
        print(f"Client sent: {data}")

        await client_socket.send(f"Received data: {data}")

async def start_server():
    print("Server Started")
    async with websockets.serve(new_client, 'localhost', 8000):
        await asyncio.Future()


if __name__ == '__main__':
    asyncio.run(start_server()) 