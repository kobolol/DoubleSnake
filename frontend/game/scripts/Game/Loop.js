import Game from "./Game.js"

class Loop{
    /**@param {import("../../../../backend/node_modules/socket.io-client".Socket} socket  @param {Game} game  Autocompletions VSC*/
    constructor(socket, game){
        this.socket = socket;
        this.game = game;

        this.socket.on("loop", (data) => { this.loop(data) });
    }

    loop(data){
        this.game.playGround.resetOverlays();
        const tiles = data.playground.tiles;

        tiles.forEach((row, x) => {
            row.forEach((tile, y) => {
                if(!tile) return;
                console.log(tile)
                if(tile.class === "Snake"){
                    /** @type {HTMLImageElement} */
                    const tileImg = this.game.playGround.getOverlayTile(x, y);

                    tileImg.src = `./assets/Snakes/${tile.color}/${tile.type}.png`;
                    tileImg.style.display = "block"
                    tileImg.style.transform = `rotate(${tile.deg}deg)`;
                }
            })
        });
    }
}

export default Loop;