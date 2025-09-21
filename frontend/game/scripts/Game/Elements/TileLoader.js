const SNAKE_COLOR_ASSET_MAP = {
    blue: "Blue",
    red: "Red",
};

export const resolveSnakeAssetColor = (color) => {
    if (!color) return color;

    const normalizedColor = color.toLowerCase();
    return SNAKE_COLOR_ASSET_MAP[normalizedColor] ?? color;
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
            const assetColor = resolveSnakeAssetColor(color);
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
}

export default TileLoader;
