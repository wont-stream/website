const hyperheart = new WebSocket("wss://hyperheart.katze.click/");
const hr = document.getElementById("heart");
const avgHr = document.getElementById("avg-heart");

hyperheart.onmessage = ({ data }) => {
    const {hr, avg} = JSON.parse(data);

    hr.style.setProperty("--value", hr)
    avgHr.style.setProperty("--value", avg)
};
