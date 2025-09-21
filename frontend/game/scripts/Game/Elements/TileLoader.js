const SNAKE_COLOR_ASSET_MAP = {
    blue: "Blue",
    red: "Red",
};

class TileLoader{
    constructor(){
        const fruitSources = [
            "Fruits/Apfel.png",
            "Fruits/Blaubeere.png",
        ];

        const snakeSegments = [
            "End.png",
            "Head.png",
            "Straight.png",
            "Turn.png",
        ];

        const snakeSources = Object.keys(SNAKE_COLOR_ASSET_MAP).flatMap(color => {
            const assetColor = SNAKE_COLOR_ASSET_MAP[color] ?? color;
            return snakeSegments.map(segment => `Snakes/${assetColor}/${segment}`);
        });

        this.allSrc = [...fruitSources, ...snakeSources];

        this.tileMap = new Map();

        this.allSrc.forEach(src => {
            const img = new Image();
            img.src = `./assets/${src}`;
            this.tileMap.set(src, img);
        })
    }

    resolveSrc(src){
        if(this.tileMap.has(src)) return src;

        const [category, color, ...rest] = src.split("/");
        if(category !== "Snakes" || rest.length === 0) return src;

        const mappedColor = SNAKE_COLOR_ASSET_MAP[color] ?? color;
        const normalizedSrc = [category, mappedColor, ...rest].join("/");

        if(this.tileMap.has(normalizedSrc)) return normalizedSrc;

        return src;
    }

    getImage(src){
        const resolvedSrc = this.resolveSrc(src);

        return this.tileMap.get(resolvedSrc);
    }
}

export default TileLoader;