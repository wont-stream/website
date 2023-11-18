const loaded = () => {
    document
        .getElementById("age")
        .style.setProperty(
            "--value",
            new Date().getFullYear() - new Date("09/08/09").getFullYear()
        );
};

if (document.readyState === 'complete') {
    loaded();
} else {
    window.addEventListener('load', loaded);
}