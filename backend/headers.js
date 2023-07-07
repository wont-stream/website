module.exports = (app) => {
    app.get("/headers", (req, res) => {
        res.send(req.headers)
    })
}