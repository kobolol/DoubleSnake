import UIManager from "../UI/UIManager.js";
import Game from "../Game.js";
import Overlay from "./Overlay.js";

class Playground{
    /**@param {import(Game} game @param {UIManager} uiManager */
    constructor(game, uiManager, playgroundSize){
        this.playgroundSize = playgroundSize;
        this.game = game;
        this.uiManager = uiManager;
  
        this.tileSize = Math.floor(window.innerHeight / playgroundSize.height);

        // Canvas erstellen
        this.canvas = document.createElement("canvas");
        this.canvas.height = this.playgroundSize.height * this.tileSize;
        this.canvas.width = this.playgroundSize.width * this.tileSize;
        this.uiManager.gameCanvasDiv.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");

        // Hintergrund Bilder Laden
        this.bgImage1 = new Image();
        this.bgImage1.src = "./assets/Gras/Gras1.png";
        this.bgImage2 = new Image();
        this.bgImage2.src = "./assets/Gras/Gras2.png";

        // Overlays Also Schlangen und Früchte erstellen
        /** @type {Array<Array<Overlay>>} */
        this.overlays = [];

        for(let y = 0; y < this.playgroundSize.height; y++){
            const row = [];
            for(let x = 0; x < this.playgroundSize.width; x++){
                const overlay = new Overlay();
                row.push(overlay);
            }
            this.overlays.push(row);
        }
    }

    draw () {
        // Canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Jedes Tile / Overlay durchgehen und erst background dann falls da Overlay rendern
        for(let y = 0; y < this.playgroundSize.height; y++){
            for (let x = 0; x < this.playgroundSize.width; x++){
                const posX = x * this.tileSize;
                const posY = y * this.tileSize;

                // Hintergrund rendern
                const bgImage = ((x % 2) === (y % 2)) ? this.bgImage1 : this.bgImage2;
                this.ctx.drawImage(bgImage, posX, posY, this.tileSize, this.tileSize);

                // Falls overlay vorhanden darauf rendern
                const overlay = this.overlays[y][x];
                if(!overlay.src) continue;
                this.ctx.save();

                // Rotation anwenden | Bisschen Komplexes Mathe Funzt :)
                const centerX = posX + this.tileSize / 2;
                const centerY = posY + this.tileSize / 2;
                this.ctx.translate(centerX, centerY);
                const rotation = (overlay.deg) * Math.PI / 180;
                this.ctx.rotate(rotation);
                this.ctx.drawImage(overlay.image, -this.tileSize / 2, -this.tileSize / 2, this.tileSize, this.tileSize);
                this.ctx.restore();
            }
        }
    }

    resetOverlay(){
        this.overlays.forEach(row => {
            row.forEach(overlay => {
                overlay.src = null;
                overlay.deg = 0;
            })
        })
    }

    setOverlay(x, y, newOverlay){
        this.overlays[y][x] = newOverlay;
    }
}

export default Playground;