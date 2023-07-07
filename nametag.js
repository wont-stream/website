const WebSocket = require("ws")

module.exports = class nametag {
    constructor(api, userid, cb) {
        this.ws = new WebSocket(api);
        this.userid = userid;
        this.cb = cb;

        this.ws.onopen = () => this.wsOpen();
        this.ws.onclose = () => this.wsOpen();
        this.ws.onerror = () => this.wsOpen();
        this.ws.onmessage = (event) => this.wsMsg(event);
    }

    wsOpen() {
        this.ws.send(JSON.stringify({
            op: 1,
            user: this.userid
        }));
    }

    wsMsg({
        data
    }) {
        const parsedData = JSON.parse(data);

        switch (parsedData.op) {
            case 2:
                setInterval(() => this.wsKA(), parsedData.ka);
                break;
            case 4:
                // cool, we are still going
                break;
            case 5:
                this.cb(parsedData.d);
                break;
        }
    }

    wsKA() {
        this.ws.send(JSON.stringify({
            op: 3
        }));
    }
}