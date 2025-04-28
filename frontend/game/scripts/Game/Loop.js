import Overlay from "./Elements/Overlay.js";
import TileLoader from "./Elements/TileLoader.js";
import Game from "./Game.js"

class Loop{
    /**@param {import("../../../../backend/node_modules/socket.io-client".Socket} socket  @param {Game} game  Autocompletions VSC*/
    constructor(socket, game){
        this.socket = socket;
        this.game = game;
        this.tileLoader = new TileLoader();

        this.socket.on("loop", (data) => { this.loop(data) });
    }

    loop(data){
        this.game.playGround.resetOverlay();
        const tiles = data.playground.tiles;

        // Spielfeld Zeichenen
        tiles.forEach((row, x) => {
            row.forEach((tile, y) => {
                if(!tile) return;
                if(tile.class === "Snake"){
                    const overlay = new Overlay(
                        this.tileLoader,
                        `Snakes/${tile.color}/${tile.type}.png`,
                        tile.deg
                    )

                    this.game.playGround.setOverlay(x, y, overlay);
                }
                else if(tile.class === "Fruit"){
                    const overlay = new Overlay(
                        this.tileLoader,
                        `Fruits/${tile.type}.png`
                    )

                    this.game.playGround.setOverlay(x, y, overlay);
                }
            })
        });

        // Score Anzeigen
        this.game.uiManager.score.innerText = `${data.score}`;

        this.game.playGround.draw();
    }
}

export default Loop;