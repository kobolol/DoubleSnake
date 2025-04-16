class Overlay{
    constructor(src = null, deg = 0){
        this.src = src;
        this.deg = deg;

        if(!this.src) return;
        this.image = new Image();
        this.image.src = src;
    }
}

export default Overlay