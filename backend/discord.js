module.exports = (app) => {
    app.get("/Discord.ipa", async ({ res }) => {
        const resp = await fetch("https://ipa.aspy.dev/discord/testflight/")
        const data = await resp.text()

        const arr = data.match(/\.\/[^/]+\.ipa/g)
        
        res.redirect(arr[arr.length - 1].replace(".", "https://ipa.aspy.dev/discord/testflight"))
    })

    app.get("/Discord.Stable.ipa", async ({ res }) => {
        const resp = await fetch("https://ipa.aspy.dev/discord/testflight/")
        const data = await resp.text()

        const arr = data.match(/\.\/[^/]+\.ipa/g)
        
        res.redirect(arr[arr.length - 1].replace(".", "https://ipa.aspy.dev/discord/stable"))
    })
}