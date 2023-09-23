const { makeBadge } = require('../modded_deps/badge-maker')
const feather = require("feather-icons")
const simple = require("simple-icons")
const oct = require("@primer/octicons")

let featherSlugs = Object.keys(feather.icons)
let simpleSlugs = Object.keys(simple)
let octSlugs = Object.keys(oct)

module.exports = (app) => {
    app.get("/badge", (req, res) => {
        const {
            label,
            message,
            labelColor,
            color,
            style,
            logo,
            logoColor,
            linkLeft,
            linkRight
        } = req.query
        res.setHeader("content-type", "image/svg+xml")
        res.send(makeBadge(getLogo({
            label,
            message: message || '',
            labelColor,
            color,
            style: style || 'flat',
            links: [linkLeft || "https://katze.click", linkRight || "https://github.com/de-katze/website"]
        }, logo || "", logoColor)))
    })

    app.get("/badge/slugs", (req, res) => {
        res.send({
            ["feather-icons"]: featherSlugs,
            ["simple-icons"]: simpleSlugs,
            ["octicons"]: octSlugs
        })
    })
}

function getLogo(data, name, color) {
    if (name.length == 0) {
        return data
    }

    if (name.startsWith("ft") && feather.icons[name.replace("ft", "")]) {
        data.logo = encode(feather.icons[name.replace("ft", "")].toSvg({ color: color || "#FFFFFF" }))
        return data
    } else if (name.startsWith("oct") && oct[name.replace("oct", "")]) {
        data.logo = encode(oct[name.replace("oct", "")].toSVG({ "fill": color || "#FFFFFF", "xmlns": "http://www.w3.org/2000/svg" }))
        return data
    } else if (name.startsWith("si") && simple[name]) {
        data.logo = encode(simple[name].svg.replace(`<svg role="img"`, `<svg role="img" fill="${color || `#${simple[name].hex}`}"`))
        return data
    }

    return data
}

function encode(svg) {
    return `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`;
}