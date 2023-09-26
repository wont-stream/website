fetch("https://a.katze.click/_");

import './js/loading.js';
import './js/discord.js';

const main = document.body
const modal = document.getElementById("modal");
const content = document.getElementById("content")

window.openModal = async (id) => {
    const res = await fetch(`./pages/${id}.html`)
    const data = await res.text()

    content.innerHTML = `<br><br><br>${await data}`

    main.classList.add("modal-open");
    modal.classList.add("open");
}

window.closeModal = () => {
    modal.classList.remove("open");
    main.classList.remove("modal-open");
}

window.addEventListener("keydown", (event) => {
    if (event.code !== "Escape") return;
    closeModal();
});