class TileLoader{
    constructor(){
        this.allSrc = [
            "Fruits/Apfel.png",
            "Fruits/Blaubeere.png",
            "Snakes/blue/End.png",
            "Snakes/blue/Head.png",
            "Snakes/blue/Straight.png",
            "Snakes/blue/Turn.png",
            "Snakes/red/End.png",
            "Snakes/red/Head.png",
            "Snakes/red/Straight.png",
            "Snakes/red/Turn.png",
        ];

        this.tileMap = new Map();

        this.allSrc.forEach(src => {
            const img = new Image();
            img.src = `./assets/${src}`;
            this.tileMap.set(src, img);
        })
    }
}

export default TileLoader;