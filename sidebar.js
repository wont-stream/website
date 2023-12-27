let items = [
    ["Home", "/"],
    ["About", "about/"],
]

module.exports = () => {
    let sidebar = "";

    items.forEach(sideItem => {
        sidebar += `- [${sideItem[0]}](${sideItem[1]})\n`
    })
    
    return sidebar
}