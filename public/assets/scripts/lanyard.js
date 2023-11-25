const lanyard = new WebSocket("wss://api.lanyard.rest/socket");
const avatar = document.getElementById("avatar");

lanyard.onmessage = ({ data }) => {
    data = JSON.parse(data);

    switch (data.op) {
        case 0: {
            switch (data.t) {
                case "INIT_STATE": {
                    discord(data.d["1125315673829154837"])
                }
                break

                case "PRESENCE_UPDATE": {
                    discord(data.d)
                }
                break

                default: {}
                break
            }
        };
        break

        case 1: {
            lanyard.send(JSON.stringify({
                op: 2,
                d: {
                  subscribe_to_ids: ["1125315673829154837"]
                }
              }))

              setInterval((() => {
                lanyard.send(JSON.stringify({
                    op: 3
                  }))
              }), data.d.heartbeat_interval)
              
        };
        break

        default: {};
        break
    }
};

const discord = (data) => {
    avatar.classList = `btn btn-ghost btn-circle avatar ${data.discord_status}`
}