import AnimatedCursor from './node_modules/animated-cursor/dist/index.modern.js';

const hyperheart = new WebSocket("wss://hyperheart.katze.click/");
const time = document.getElementById("time");
const timeStatus = document.getElementById("status");
const hr = document.getElementById("hr");
const avgHr = document.getElementById("avg-hr");
const numbers = [];

const updateClock = () => {
    const currentTime = new Date().toLocaleString("en-DE", { timeZone: "America/New_York" }).split(", ")[1].split(":");

    time.innerText = `${currentTime[0]}:${currentTime[1]}:${currentTime[2]}`
    timeStatus.innerText = currentTime[0] >= 0 && currentTime[0] <= 6 ? "asleep" : "awake";
};
updateClock()
setInterval(updateClock, 1000);

hyperheart.onmessage = ({ data }) => {
    const heartRate = JSON.parse(data).hr;
    numbers.push(heartRate);
    hr.innerText = heartRate
    avgHr.innerText = Math.floor(numbers.reduce((acc, num) => acc + num, 0) / numbers.length);
};

AnimatedCursor({
    color: '#FFFFFF',
    outerAlpha: 0.1,
    size: {
        inner: 4,
        outer: 24
    },
    hoverScale: {
        inner: 0.5,
        outer: 1.4
    },
    clickScale: {
        inner: 1.5,
        outer: 0
    }
}).init();
