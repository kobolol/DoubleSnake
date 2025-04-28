import TileLoader from "./TileLoader.js";

class Overlay{
    /** @param {TileLoader} tileLoader */
    constructor(tileLoader, imgSrc = null, deg = 0){
        this.tileLoader = tileLoader;
        this.deg = deg;
        this.src = imgSrc;

        if(!this.src) return;
        this.image = this.tileLoader.tileMap.get(this.src);
    }
}

export default Overlay