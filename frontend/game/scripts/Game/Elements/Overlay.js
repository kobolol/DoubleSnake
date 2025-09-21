import TileLoader from "./TileLoader.js";

class Overlay{
    /** @param {TileLoader} tileLoader */
    constructor(tileLoader, imgSrc = null, deg = 0){
        this.tileLoader = tileLoader;
        this.deg = deg;
        this.src = imgSrc;

        if(!this.src) return;
        const image = this.tileLoader.getImage(this.src);

        if(!image){
            this.src = null;
            return;
        }

        this.src = this.tileLoader.resolveSrc(this.src);
        this.image = image;
    }
}

export default Overlay