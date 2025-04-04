class Loop{
    /**@param {import("../../../../backend/node_modules/socket.io-client".Socket} socket  @param {HTMLDivElement} tilesDiv Autocompletions VSC*/
    constructor(socket, tilesDiv, tileSize){
        this.socket = socket;
        this.tilesDiv = tilesDiv;

        this.tileSize = tileSize;

        this.socket.on("loop", (data) => { this.loop(data) });
    }

    loop(data){
         
    }
}

export default Loop;