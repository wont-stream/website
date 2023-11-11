const hyperheart = new WebSocket("wss://hyperheart.katze.click/");
const hr = document.getElementById("hr");
const avgHr = document.getElementById("avg-hr");
const numbers = [];

hyperheart.onmessage = ({ data }) => {
    const heartRate = JSON.parse(data).hr;
    numbers.push(heartRate);
    hr.innerText = heartRate
    avgHr.innerText = Math.floor(numbers.reduce((acc, num) => acc + num, 0) / numbers.length);
};