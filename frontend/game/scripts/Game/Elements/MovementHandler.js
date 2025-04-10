class MovementHandler{
    /**@param {import("../../../../../backend/node_modules/socket.io-client".Socket} socket Autocompletions VSC*/
    constructor(socket){
        this.socket = socket;

        this.keys = [
            {
                keys: ["w", "W", "ArrowUp"],
                name:"up"
            },
            {
                keys: ["s", "S", "ArrowDown"],
                name:"down"
            },
            {
                keys: ["d", "D", "ArrowRight"],
                name:"right"
            },
            {
                keys: ["a", "A", "ArrowLeft"],
                name:"left"
            }
        ]

        document.addEventListener("keydown", (e) => { this.updateMovement(e) });
    }

    /**@param {KeyboardEvent} e */
    updateMovement(e){
        const key = e.key;
        let direction = null;

        this.keys.forEach(e => {
            e.keys.forEach(x => {
                if(x === key){
                    direction = e.name;
                }
            })
        });

        if(!direction) return;

        this.socket.emit("movement", direction);
    }
}

export default MovementHandler;