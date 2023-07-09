// Requires
const express = require("express")
const i18n = require("./backend/i18n")

// Setup
const app = express()
app.use("/api", require("./backend"))

app.engine('handlebars', require('express-handlebars').engine({
    defaultLayout: 'main', layoutsDir: __dirname + '/frontend/layouts/', partialsDir: __dirname + '/frontend/partials/'
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/frontend/views');

app.use((req, res, next) => {
    req.lang = i18n["en-US"]

    if (req.query.lang) {
        if (i18n[req.query.lang]) {
            return req.lang = i18n[req.query.lang]
        }
    } else {
        langHeader(req.header("accept-language") || "en-US").forEach(lang => {
            if (i18n[lang]) {
                return req.lang = i18n[lang]
            }
        })
    }

    next()
})

// serve all files using express.static
app.use(express.static('frontend'));
app.enable('view cache');

require("fs").readdirSync(`${__dirname}/frontend/views`).forEach(fileName => {
    fileName = fileName.replace(".handlebars", "")
    app.get(`${fileName == "index" ? "/" : `/${fileName}`}`, function (req, res) {
        res.render(fileName, {
            arcWidget: req.header('Sec-GPC') !== "1" || req.header("DNT") !== "1",
            lang: req.lang
        });
    });
})

app.use(function (req, res) {
    res.status(404);

    // Respond with HTML page
    if (req.accepts('html')) {
        return res.redirect("/404");
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

function langHeader(header) {
    const languages = header.split(',');
    return languages.map((language) => {
        const [code, qvalue] = language.split(';q=');
        return {
            code: code.trim(),
            qvalue: qvalue ? parseFloat(qvalue) : 1.0
        };
    }).sort((a, b) => b.qvalue - a.qvalue).map(({ code }) => `${code}`);
}