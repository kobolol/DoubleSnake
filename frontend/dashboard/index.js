class DataFetcher {
    constructor() {
        this.greetingText = document.getElementById("data");
        this.init();
    }

    async init() {
        const reponse = await fetch("/api/dashboard");
        this.data = await reponse.json();

        this.greetingText.innerText = `Hallo ${this.data.fullName ? this.data.fullName : this.data.username}, starte hier Double-Snake!`
    }
}

new DataFetcher();