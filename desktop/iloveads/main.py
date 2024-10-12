import asyncio
import websockets

async def handler(websocket, path):
    async for message in websocket:
        print(f"Received message from extension: {message}")
        response = f"Message received: {message}"
        await websocket.send(response)



def main():
    start_server = websockets.serve(handler, "localhost", 61434)
    
    asyncio.get_event_loop().run_until_complete(start_server)
    print("WebSocket server started at ws://localhost:61434")
    asyncio.get_event_loop().run_forever()
