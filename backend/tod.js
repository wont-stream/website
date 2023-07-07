const crypto = require("crypto")

let truth, dare;

fetch("https://gist.githubusercontent.com/VaithTheWraith/2377302fba1781f82a2b055efd9196d2/raw/4bf15cb5178dc6d1cbf1cd9cb725c414199813e6/truth.txt")
    .then(d => d.text())
    .then(d => {
        truth = d.split("\n")
    })
fetch("https://gist.githubusercontent.com/VaithTheWraith/029611f311c88b493900476c4b21f37a/raw/74e7ce62d6eada5d6ed0de302117eafdb86de59a/dare.txt")
    .then(d => d.text())
    .then(d => {
        dare = d.split("\n")
    })

module.exports = (app) => {
    app.get("/tod", ({ res }) => {
        res.send({
            truth: truth[crypto.randomInt(truth.length + 1)],
            dare: dare[crypto.randomInt(dare.length + 1)]
        })
    })
}