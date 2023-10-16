window.indicator = false;
let ws = new WebSocket("wss://api.lanyard.rest/socket")

ws.onmessage = ({data}) => {
    const { op, t, d } = JSON.parse(data)

    switch (op) {
        case 0: {
            switch (t) {
                case 'INIT_STATE': {
                    update(d["1125315673829154837"])
                }
                break
                case 'PRESENCE_UPDATE': {
                    update(d)
                }
                break
            }
        }
        break
        case 1: {
            setInterval(() => {
                ws.send(JSON.stringify({
                    op: 3
                }))
            }, d.heartbeat_interval /2)

            ws.send(JSON.stringify({
                op: 2,
                d: {
                  subscribe_to_ids: ["1125315673829154837"]
                }
              }))
        }
        break
    }
}

const indicator = document.getElementById("indicator")

const update = (data) => {
    console.log(data)
    const { discord_status } = data

    indicator.classList = `indicator ${discord_status == "idle" ? "afk" : discord_status}`
    window.indicator = true;
}