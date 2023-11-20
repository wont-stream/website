const avatar = document.getElementById("avatar");

const grabData = async () => {
    let data = await fetch("https://lanyard.rest/v1/users/1125315673829154837")

    discord(await data.json())
}

const discord = (data) => {
    avatar.classList = `avatar ${data.discord_status}`
}

grabData()
