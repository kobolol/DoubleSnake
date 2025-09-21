import { resolveSnakeAssetColor } from "../Elements/TileLoader.js";

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
        const assetColor = resolveSnakeAssetColor(color);
        for (let i = 0; i < lenght; i++) {
            const tr = document.createElement("tr");
            const td = document.createElement("td");

            const img = document.createElement("img");
            switch (i) {
                case 0:
                    img.src = `./assets/Snakes/${assetColor}/Head.png`;
                    break;
                case lenght - 1:
                    img.src = `./assets/Snakes/${assetColor}/End.png`;
                    break;
                default:
                    img.src = `./assets/Snakes/${assetColor}/Straight.png`;
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
        scoreDiv.appendChild(scoreSign);

        const score = document.createElement("h2");
        score.innerText = data.score;
        scoreDiv.appendChild(score);

        const rang = document.createElement("h2");
        rang.innerText = `Bestenliste Platz: ${data.rang}`;
        rang.style.color = "rgb(255, 223, 0)";

        scoreDiv.appendChild(rang);

        endDiv.appendChild(scoreDiv);

        if(data.replay.possible){
            this.replayContainer = document.createElement("div");
            this.replayContainer.id = "replayContainer"; // ID für den Container
            endDiv.appendChild(this.replayContainer);

            this.replayButton = document.createElement("button");
            this.replayButton.id = "replayBtn";
            this.replayButton.innerHTML = `
                <div class="buttonIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF">
                    <path d="M447.33-122Q325-133.67 242.5-224.5 160-315.33 160-439.33q0-73.34 32.33-138.84 32.34-65.5
                     91-109.16L331-639.67q-50 33.34-77.17 86.67-27.16 53.33-27.16 113.67 0 96 62.66 167.16 62.67 71.17
                      158 83.5V-122Zm66.67 0v-66.67q95.67-13.33 157.83-84Q734-343.33 734-439.33q0-106-73.67-179.67-73.66-73.67-179.66-73.67h-14.3
                      4L521-638l-47.33 47.33L338.33-726l135.34-135.33L521-814l-54.67 54.67h14.34q134 0 227 93.33t93 226.67q0 123.66-82.17 214.5
                      Q636.33-134 514-122Z"/>
                    </svg>
                </div>
                <div class="buttonText">
                    Neue Runde
                </div>
            `;
            this.replayButton.addEventListener("click", () => { window.location.href = "/game"; });
            this.replayContainer.appendChild(this.replayButton);

            this.timeText = document.createElement("p");
            this.timeText.id = "timeText";
            this.timeText.innerText = `Möglichkeit für nächste: ${data.replay.time / 1000} Sekunden`;
            this.replayContainer.appendChild(this.timeText);

            this.time = data.replay.time;

            setTimeout(() => {
                this.timerTimeOut();
            }, 1000);
        }

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

    timerTimeOut(){
        this.time -= 1000;

        const newTime = this.time / 1000;
        this.timeText.innerText = `Möglichkeit für nächste: ${newTime} Sekunden`
        if(newTime <= 0){
            this.replayContainer.style.display = "none";
        }else{
            setTimeout(() => {
                this.timerTimeOut();
            }, 1000);
        }
    }
}

export default UIManager;
