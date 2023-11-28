require("http").createServer(async (req, res) => await require("serve-handler")(req, res, {
    public: "public",
    cleanUrls: true,
    trailingSlash: false
})).listen(3000, () => {
    console.log("Running at :3000")
});
