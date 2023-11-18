const hr = document.getElementById("hr");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const timeStatus = document.getElementById("status");

const updateClock = () => {
    const currentTime = new Date().toLocaleString("en-DE", { timeZone: "America/New_York" }).split(", ")[1].split(":");

    hr.style.setProperty("--value", currentTime[0])
    min.style.setProperty("--value", currentTime[1])
    sec.style.setProperty("--value", currentTime[2])
    timeStatus.innerText = currentTime[0] >= 0 && currentTime[0] <= 6 ? "asleep" : "awake";
};
updateClock()
setInterval(updateClock, 1000);