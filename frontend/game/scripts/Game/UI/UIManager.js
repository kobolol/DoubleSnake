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

    // Erstellen der Info für welche Schlange man ist
    addSnakeColorInfo(color){
        const infoDiv = document.createElement("div");
        infoDiv.id = "infoDiv"

        const header = document.createElement("h1")
        header.innerText = "Deine Schlange:"
        infoDiv.appendChild(header);

        const snakeTable = document.createElement("table");
        const lenght = 3;
        for (let i = 0; i < lenght; i++) {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
    
            const img = document.createElement("img");
            switch (i) {
                case 0:
                    img.src = `./assets/Snakes/${color}/Head.png`;
                    break;
                case lenght - 1:
                    img.src = `./assets/Snakes/${color}/End.png`;
                    break;
                default:
                    img.src = `./assets/Snakes/${color}/Straight.png`;
                    break;
            }
            img.style.transform = "rotate(270deg)";
            img.style.width = "10vw"; 
            img.style.height = "10vw";
    
            td.appendChild(img);
            tr.appendChild(td);
            snakeTable.appendChild(tr);
        }

        infoDiv.append(snakeTable);

        this.mainDiv.appendChild(infoDiv);
    }
}

export default UIManager;