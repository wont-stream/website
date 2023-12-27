require('dotenv').config()

const express = require("express");
const express_ws = require('express-ws');
const sidebar = require("./sidebar")
const WebSocket = require("ws");

const app = express()
const expressWs = express_ws(app)
const _sidebar_dot_md = sidebar()

let hr = 0
const numbers = [];

const clients = new Set();

function connectToHyperateWebSocket() {
    const { token, seshid } = process.env;

    if (!token) {
        return new Error("token not defined")
    }

    if (!seshid) {
        return new Error("seshid not defined")
    }

    const ws = new WebSocket(`wss://app.hyperate.io/socket/websocket?token=${token}`);

    ws.onopen = () => {
        ws.send(JSON.stringify({
            "topic": `hr:${seshid}`,
            "event": "phx_join",
            "payload": {},
            "ref": 0
        }));

        setInterval(() => {
            ws.send(JSON.stringify({
                "topic": "phoenix",
                "event": "heartbeat",
                "payload": {},
                "ref": 0
            }));
        }, 8000);
    };

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.event === "hr_update") {
            hr = data.payload.hr;
            numbers.push(data.payload.hr)

            const avg = Math.floor(numbers.reduce((acc, num) => acc + num, 0) / numbers.length)

            const message = { hr, avg }
            console.log(message)
            for (const client of clients) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(message));
                } else {
                    clients.delete(client);
                }
            }
        }
    };

    ws.onclose = () => {
        setTimeout(connectToHyperateWebSocket, 1000);
    };
}

app.use("/node_modules", express.static("node_modules"))

app.use(express.static("static"))

app.use(express.static("pages"))

app.get("/_sidebar.md", (req, res) => {
    res.send(_sidebar_dot_md)
})

app.ws('/echo', function (ws, req) {
    ws.on('message', function (msg) {
        ws.send(msg);
    });
});

app.ws('/heartrate', function (ws, req) {
    clients.add(ws);

    const avg = Math.floor(numbers.reduce((acc, num) => acc + num, 0) / numbers.length)

    const message = { hr, avg }

    ws.send(JSON.stringify(message))

    ws.on('close', () => {
        clients.delete(ws);
    });
});


const clearDaily = () => {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));

    if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        numbers = [];
    }
};

app.listen(3000, () => {

    clearDaily();

    setInterval(clearDaily, 60 * 1000);

    connectToHyperateWebSocket();

})