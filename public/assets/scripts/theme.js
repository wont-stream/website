const html = document.getElementById("html");

switch (new Date().getMonth() + 1) {
    case (10): {
        html.setAttribute("data-theme", "halloween")
    };

    default: {};
}