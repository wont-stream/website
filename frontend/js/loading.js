window.addEventListener("DOMContentLoaded", () => {
    setInterval(() => {
        document.getElementById("loading").classList.remove("open");
        document.body.classList.remove("modal-open");
    }, 1000)
});