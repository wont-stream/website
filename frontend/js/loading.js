const closeLoading = () => {
        if (!window.indicator) return setTimeout(closeLoading, 500);

        document.getElementById("loading").remove();
        document.body.classList.remove("modal-open");
}

window.addEventListener("load", closeLoading);