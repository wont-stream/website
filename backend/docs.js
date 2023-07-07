module.exports = (app) => {
   app.get("/", ({ res }) => {
      res.sendFile(__dirname + "/html/docs.html")
   })

   app.get("/slugs", ({ res }) => {
      res.sendFile(__dirname + "/html/slugs.html")
   })
}