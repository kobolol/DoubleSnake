import UIManager from "../UI/UIManager.js";
import Game from "../Game.js";

class Playground{
    /**@param {import(Game} game @param {UIManager} uiManager */
    constructor(game, uiManager, playgroundSize){
        this.playgroundSize = playgroundSize;
        this.game = game;
        this.uiManager = uiManager;

        this.tiles = [];
  
        this.tileSize = window.innerHeight / playgroundSize.height;

        this.setupTiles();
    }

    setupTiles(){
        for(let i = 0; i < this.playgroundSize.width; i++){
            const row = document.createElement("tr");
            let rowTiles = [];
            this.uiManager.gameTable.appendChild(row);

            for(let u = 0; u < this.playgroundSize.height; u++){
                const td = document.createElement("td");

                const bgImage = document.createElement("img");
                (u % 2 == i % 2) ? bgImage.src = "./assets/Gras/Gras1.png" : bgImage.src = "./assets/Gras/Gras2.png";
                bgImage.height = this.tileSize;
                bgImage.width = this.tileSize;
                bgImage.classList.add("backgroundTile");
                td.appendChild(bgImage);
                row.appendChild(td);

                rowTiles.push(td);
            }

            this.tiles.push(rowTiles);
        }
    }
}

export default Playground;