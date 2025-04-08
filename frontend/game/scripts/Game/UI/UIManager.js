class UIManager{
    constructor(){
        this.mainDiv = document.getElementById("mainMenu");

        this.gameTable = undefined;
    }

    // Erstellen des Grundgerüstes der UI
    loadGameContent(){
        this.mainDiv.innerHTML = "";

        const body = document.body;
        body.style.backgroundImage = "none";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundColor = "#3b3b3f";

        this.gameTable = document.createElement("table");

        this.mainDiv.appendChild(this.gameTable);
    }
}

export default UIManager;