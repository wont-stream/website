require('dotenv').config()

const express = require("express");
const express_ws = require('express-ws');
const WebSocket = require("ws");

const app = express()
const expressWs = express_ws(app)

let hr = 0
const numbers = [];


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
        }
    };

    ws.onclose = () => {
        setTimeout(connectToHyperateWebSocket, 1000);
    };
}

app.use("/node_modules", express.static("node_modules"))

app.use(express.static("static"))

app.use(express.static("pages"))

app.get('/api/heartrate', function (req, res) {
    const avg = Math.floor(numbers.reduce((acc, num) => acc + num, 0) / numbers.length)

    const message = { hr, avg }

    res.send(message)
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