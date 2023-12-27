const express = require("express");
const sidebar = require("./sidebar")

const app = express()
const _sidebar_dot_md = sidebar()

app.use("/node_modules", express.static("node_modules"))

app.use(express.static("static"))

app.use(express.static("pages"))

app.get("/_sidebar.md", (req, res) => {
    res.send(_sidebar_dot_md)
})

app.get("/oembed.json", (req, res) => {
    res.send({
        "author_name": "",
        "author_url": "",
        "provider_name": "Katze's Website",
        "provider_url": "https://katze.click"
    })
})

app.listen(3000)