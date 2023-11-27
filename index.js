const handler = require('serve-handler');
let { exec } = require("child_process");
const { promisify } = require('util');
const http = require('http');

exec = promisify(exec);

(async () => {
    await exec("pnpm i")

    await exec("pnpm build")

    http.createServer(async (req, res) => await handler(req, res, {
        public: "public",
        cleanUrls: true,
        trailingSlash: false
    })).listen(3000, () => {
        console.log("Running at :3000")
    });
})()