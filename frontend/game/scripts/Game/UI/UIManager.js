class UIManager{
    constructor(){
        this.mainDiv = document.getElementById("mainMenu");
        this.score = undefined;

        this.gameCanvasDiv = undefined;
    }

    // Erstellen des Grundgerüstes der UI
    loadGameContent(){
        // Spielfeld erstellen
        this.mainDiv.innerHTML = "";

        const body = document.body;
        body.style.backgroundImage = "none";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundColor = "#3b3b3f";

        this.gameCanvasDiv = document.createElement("div");
        this.gameCanvasDiv.id = "gameCanvasDiv"

        this.mainDiv.appendChild(this.gameCanvasDiv);

        // Punktestand erstellen
        const scoreDiv = document.createElement("div");
        scoreDiv.id = "scoreDiv";
        scoreDiv.classList.add("gameShow");

        const title = document.createElement("h2");
        title.innerText = "Punktestand:";
        scoreDiv.appendChild(title);

        this.score = document.createElement("h1");
        this.score.id = "scoreText"
        this.score.innerText = "0";
        scoreDiv.appendChild(this.score);

        this.mainDiv.appendChild(scoreDiv);
    }

    // Erstellen der Info für welche Schlange man ist
    addSnakeColorInfo(color){
        const infoDiv = document.createElement("div");
        infoDiv.id = "infoDiv";
        infoDiv.classList.add("gameShow");

        const header = document.createElement("h1");
        header.innerText = "Deine Schlange:";
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