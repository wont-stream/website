import './js/loading.js';
import './js/discord.js';

const main = document.body
const modal = document.getElementById("modal");
const time = document.getElementById("time");

const pages = ["about", "info"]

window.openModal = async (id) => {
    document.getElementById(id).style.display = ""

    main.classList.add("modal-open");
    modal.classList.add("open");
}

window.closeModal = () => {
    modal.classList.remove("open");
    main.classList.remove("modal-open");

    setTimeout(() => {
        pages.forEach(id => {
            document.getElementById(id).style.display = "none"
        })
    }, 300)
}

window.addEventListener("keydown", (event) => {
    if (event.code !== "Escape") return;
    closeModal();
});

const timeFunc = () => {
    const currentTime = new Date().toLocaleString("en-DE", { timeZone: "America/New_York" }).split(", ")[1].split(":");
    const hours = parseInt(currentTime[0]);
    const status = hours >= 0 && hours <= 6 ? "asleep" : "awake";

    time.innerHTML = `It's currently ${hours}:${currentTime[1]}, I'm probably ${status}.`;
}

timeFunc()