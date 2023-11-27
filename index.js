const handler = require('serve-handler');
const http = require('http');

http.createServer(async (req, res) => await handler(req, res, {
    public: "public",
    cleanUrls: true,
    trailingSlash: false
})).listen(3000, () => {
    console.log("Running at :3000")
});