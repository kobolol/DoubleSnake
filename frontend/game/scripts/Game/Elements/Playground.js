import UIManager from "../UI/UIManager.js";
import Game from "../Game.js";

class Playground{
    /**@param {import(Game} game @param {UIManager} uiManager */
    constructor(game, uiManager, playgroundSize){
        this.playgroundSize = playgroundSize;
        this.game = game;
        this.uiManager = uiManager;

        this.tiles = [];
  
        this.tileSize = Math.floor(window.innerHeight / playgroundSize.height);

        this.setupTiles();
    }

    setupTiles(){
        for(let i = 0; i < this.playgroundSize.width; i++){
            const row = document.createElement("tr");
            let rowTiles = [];
            this.uiManager.gameTable.appendChild(row);

            for(let u = 0; u < this.playgroundSize.height; u++){
                const td = document.createElement("td");

                // Container um Überlappung zu ermöglichen
                const container = document.createElement("div");
                container.style.position = "relative";
                container.style.height = this.tileSize + "px";
                container.style.width = this.tileSize + "px";

                // Das Gras als Hintergrundbild
                const bgImage = document.createElement("img");
                bgImage.src = (u % 2 == i % 2) ? "./assets/Gras/Gras1.png" : "./assets/Gras/Gras2.png";
                bgImage.height = this.tileSize;
                bgImage.width = this.tileSize;
                bgImage.classList.add("backgroundTile");

                // Je nach belieben Overlay-Bild
                const overlayImage = document.createElement("img")
                overlayImage.style.display = "none"
                overlayImage.height = this.tileSize;
                overlayImage.width = this.tileSize;
                overlayImage.classList.add("overlayTile");

                container.appendChild(bgImage);
                container.appendChild(overlayImage);
                td.appendChild(container);
                row.appendChild(td);

                rowTiles.push(overlayImage);
            }

            this.tiles.push(rowTiles);
        }
    }

    getOverlayTile(x, y){
        if (
            y >= 0 && y < this.tiles.length &&
            x >= 0 && x < this.tiles[y].length
        ) {
            return this.tiles[y][x];
        }

        return null;
    }

    resetOverlays(){
        this.tiles.forEach(r => {
            r.forEach(e => {
                e.style.display = "none";
                e.src = "";
            })
        })
    }
}

export default Playground;