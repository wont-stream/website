import { CountUp } from './node_modules/countup.js/dist/countUp.min.js';

const hyperheart = new WebSocket("wss://hyperheart.katze.click/");
const timeStatus = document.getElementById("status");
let numbers = [];

const heart = new CountUp('heartrate', 0, {
    prefix: 'My heartrate is currently at ',
    suffix: ' BPM'
})
heart.start()

const avgheart = new CountUp('avgheartrate', 0, {
    prefix: 'My average heartrate is ',
    suffix: ' BPM'
})
avgheart.start()

const hour = new CountUp('hr', 0, { suffix: ':' })
hour.start()
const min = new CountUp('min', 0, { suffix: ':' })
min.start()
const sec = new CountUp('sec', 0);

const updateClock = () => {
    const currentTime = new Date().toLocaleString("en-DE", { timeZone: "America/New_York" }).split(", ")[1].split(":");
    const hours = parseInt(currentTime[0]);

    hour.update(hours);
    min.update(currentTime[1]);
    sec.update(currentTime[2]);

    timeStatus.innerHTML = hours >= 0 && hours <= 6 ? "asleep" : "awake";
};

setInterval(updateClock, 1000);

hyperheart.onmessage = ({ data }) => {
    const heartRate = JSON.parse(data).hr;
    numbers.push(heartRate);
    heart.update(heartRate);
    avgheart.update(Math.floor((numbers.reduce((acc, num) => acc + num, 0)) / numbers.length))
};