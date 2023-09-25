// Requires
const express = require("express")
const i18n = require("./backend/i18n")

// Setup
const app = express()
app.use("/api", require("./backend"))

// serve all files using express.static
app.use(express.static('frontend'));
app.enable('view cache');

app.use(function (req, res) {
    res.status(404);

    // Respond with HTML page
    if (req.accepts('html')) {
        return res.redirect("/");
    }

    // Respond with JSON
    if (req.accepts('json')) {
        return res.send({ error: 'Not found' });
    }

    // Default to plain-text. send()
    return res.type('txt').send('Not found');
});

app.listen(3001, (() => { console.log("Server started at : 3001") }))

process.on("uncaughtException", console.error)
process.on("unhandledRejection", console.error)
process.on("warning", console.warn)