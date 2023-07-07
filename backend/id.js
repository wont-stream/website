const crypto = require("crypto")

module.exports = (app) => {
    app.get("/id", ({ res }) => {
        let str = "";
        let id = "";

        ((Date.now()).toString().split("")).forEach(l => {
            str += `${l}${"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!*()_-~."[crypto.randomInt(71)]}`
        });

        str = str.split("").forEach(l => {
            id += `${l}${crypto.randomUUID().charAt(crypto.randomInt(37))}`
        });

        res.send({ id })
    })
}