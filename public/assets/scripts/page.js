customElements.define('display-page', class extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const pageId = this.getAttribute('page-id');
        if (pageId) {
            this.fetchAndDisplayHtml(pageId);
        }
    }

    fetchAndDisplayHtml(pageId) {
        fetch(`assets/pages/${pageId}.html`)
            .then(res => res.text())
            .then(htmlContent => {
                this.innerHTML = htmlContent;
            })
    }
});