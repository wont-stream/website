const time = document.getElementById("time");
const timeStatus = document.getElementById("status");

const updateClock = () => {
    const currentTime = new Date().toLocaleString("en-DE", { timeZone: "America/New_York" }).split(", ")[1].split(":");

    time.innerText = `${currentTime[0]}:${currentTime[1]}:${currentTime[2]}`
    timeStatus.innerText = currentTime[0] >= 0 && currentTime[0] <= 6 ? "asleep" : "awake";
};
updateClock()
setInterval(updateClock, 1000);