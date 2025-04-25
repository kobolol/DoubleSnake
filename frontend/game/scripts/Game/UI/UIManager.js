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

    showEndScreen(data){
        const endDivOverlay = document.createElement("div");
        endDivOverlay.id = "endDivOverlay";

        this.mainDiv.appendChild(endDivOverlay);

        const endDiv = document.createElement("div");
        endDiv.id = "endDiv";
        endDivOverlay.appendChild(endDiv);

        const header = document.createElement("h1");
        header.innerText = "Spiel Beendet"
        endDiv.appendChild(header);

        const reason = document.createElement("h2");
        reason.id = "reason";
        reason.innerText = `Grund: ${data.msg}`;
        endDiv.appendChild(reason);

        const scoreDiv = document.createElement("div");
        scoreDiv.id = "scoreEndDiv"
        const scoreSign = document.createElement("h3");
        scoreSign.innerText = "Punktestand";
        scoreDiv.appendChild(scoreSign)
        const score = document.createElement("h2");
        score.innerText = data.score;
        scoreDiv.appendChild(score);
        endDiv.appendChild(scoreDiv);

        const dashButton = document.createElement("button");
        dashButton.id = "leaveBtn";
        dashButton.innerHTML = `
            <div class="buttonIcon">
                <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px"
                    fill="#FFFFFF">
                    <path
                        d="M200-120q-33 0-56.5-23.5T120-200v-160h80v160h560v-560H200v160h-80v-160q0-33 23.5-56.5T200-840h560q33 0
                     56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm220-160-56-58 102-102H120v-80h346L364-622l56-58 200 200-200 200Z" />
                </svg>
            </div>
            <div class="buttonText">
                Verlassen
            </div>
        `;
        dashButton.addEventListener("click", () => { window.location.href = "/dashboard" })
        endDiv.appendChild(dashButton);
    }
}

export default UIManager;