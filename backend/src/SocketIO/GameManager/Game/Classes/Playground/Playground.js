class Playground {
    constructor(){
        // Spielgröße (width * height) Felder
        this.width = 20;
        this.height = 20;

        /** @type {Array<Array>} */
        this.tiles = this.createPlayground();
    }

    createPlayground(){
        const tilesArray = [];
        
        for (let i = 0; i < this.width; i++) {
            const column = [];
            for (let j = 0; j < this.height; j++) {
                column.push(null);
            }
            tilesArray.push(column);
        }

        return tilesArray;
    }

    getTile(x, y){
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return null; // Ungültiges feld
        }
        return this.tiles[x][y];
    }

    setTile(x, y, object){
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false; // Ungültiges feld
        }
        this.tiles[x][y] = object;
        return true;
    }
}

module.exports = Playground;