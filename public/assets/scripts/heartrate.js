const hyperheart = new WebSocket("wss://hyperheart.katze.click/");
const hr = document.getElementById("heart");
const avgHr = document.getElementById("avg-heart");
const numbers = [];

hyperheart.onmessage = ({ data }) => {
    const heartRate = JSON.parse(data).hr;
    numbers.push(heartRate);

    hr.style.setProperty("--value", heartRate)
    avgHr.style.setProperty("--value", Math.floor(numbers.reduce((acc, num) => acc + num, 0) / numbers.length))
};