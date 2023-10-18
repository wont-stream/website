(() => {
    const time = document.getElementById("time")
    const timeStatus = document.getElementById("status")

    const timeFunc = () => {
        const currentTime = new Date().toLocaleString("en-DE", { timeZone: "America/New_York" }).split(", ")[1].split(":");
        const hours = parseInt(currentTime[0]);

        time.innerHTML = `${hours}:${currentTime[1]}:${currentTime[2]}`;
        timeStatus.innerHTML = hours >= 0 && hours <= 6 ? "asleep" : "awake";
    }

    timeFunc()

    setInterval(timeFunc, 1000)

    document.addEventListener('scroll', () => {
        var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (window.scrollY / scrollHeight) * 100;
        document.getElementById('myBar').style.width = scrolled + '%';
    });

    // JavaScript
    function setFontSize() {
        // Get the window's inner width and height
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        // Calculate the smaller dimension (either width or height)
        var minDimension = Math.min(windowWidth, windowHeight);

        // Calculate the desired font size based on the smaller dimension
        var fontSize = minDimension * 0.023; // You can adjust the multiplier (0.02) to fit your design

        // Set the font size of the body element
        document.body.style.fontSize = fontSize + "px";
    }

    // Call the function when the window is resized
    window.addEventListener("resize", setFontSize);

    // Call the function initially to set the font size when the page loads
    setFontSize();
})()