let pages = [
    ["Home", "/"],
    ["About", "about/"],
]

module.exports = () => {
    let sidebar = ``;

    pages.forEach(sideItem => {
        sidebar += `- [${sideItem[0]}](${sideItem[1]}) \n`
    })

    return sidebar
}