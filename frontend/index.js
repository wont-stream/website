const main = document.body
const modal = document.getElementById("modal");
const content = document.getElementById("content")

const openModal = async (id) => {
    const res = await fetch(`./pages/${id}.html`)
    const data = await res.text()

    content.innerHTML = `<br><br><br>${await data}`

    main.classList.add("modal-open");
    modal.classList.add("open");
}

const closeModal = () => {
    modal.classList.remove("open");
    main.classList.remove("modal-open");
}

window.addEventListener("keydown", (event) => {
    if (event.code !== "Escape") return;
    closeModal();
});
