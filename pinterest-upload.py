import asyncio, json, websockets, sys

async def upload(path):
    ws_url = "ws://127.0.0.1:18800/devtools/page/B3E041463DBA0BD7F8A31E3DC39D6EC0"
    async with websockets.connect(ws_url) as ws:
        def send(method, params=None):
            return ws.send(json.dumps({"id": 1, "method": method, "params": params or {}}))
        async def recv():
            while True:
                msg = json.loads(await ws.recv())
                if "id" in msg and msg["id"] == 1:
                    return msg

        await send("DOM.getDocument", {"depth": 0})
        doc = await recv()
        root = doc["result"]["root"]["nodeId"]

        await send("DOM.querySelector", {"nodeId": root, "selector": "input[type=file]"})
        res = await recv()
        node_id = res["result"]["nodeId"]
        print("nodeId", node_id)

        await send("DOM.setFileInputFiles", {"nodeId": node_id, "files": [path]})
        res = await recv()
        print("upload result", res)

asyncio.run(upload(sys.argv[1]))
