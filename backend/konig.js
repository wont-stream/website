const crypto = require("crypto")

module.exports = (app) => {
     app.get("/konig", ({ res }) => {
          res.sendFile(__dirname + `/audio/konig_${crypto.randomInt(639)}.wav`)
     })
}