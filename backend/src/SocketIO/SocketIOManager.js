const socketIO = require("socket.io");
const http = require("http");
const DataBaseManager = require("../Database/DataBaseManager");
const ExpressManager = require("../Express/ExpressManager");
const LobbyManager = require("./LobbyManager/LobbyManager");
const ClientHandler = require("./LobbyManager/ClientHandler");
require("dotenv").config();

class SocketIOManager {
    /** @param {DataBaseManager} dbManager @param {ExpressManager} expressManager */
    constructor(dbManager, expressManager) {
        this.db = dbManager;
        this.express = expressManager;
        
        
        this.server = http.createServer(this.express.app);
        
        /** @type {import("socket.io").Server} */
        this.io = socketIO(this.server);
        
        // Dadurch bekommen wir Zugriff auf den Eingeloggten Nutzer
        this.io.use((socket, next) => {
            this.express.sessionMiddleware(socket.request, socket.request.res || {}, next);
        });

        this.io.use((socket, next) => {this.useAuth(socket, next)});

        /*
            Der LobbyManager kümmert sich um alle Lobbys
            Der LobbyHandler kümmert sich um die einzelnen Anfragen der Clients
         */
        this.lobbyManager = new LobbyManager(this.io);

        this.io.on("connection", (socket) => { this.sendToRightManager(socket) });

        // Startet express und socket.io
        this.server.listen(process.env.PORT, () => {
            console.log(`Der Server ist gestartet und unter http://localhost:${process.env.PORT} erreichbar!`);
        });
    }

    /** @param {socketIO.Socket} socket @param {socketIO.ExtendedError} next */
    useAuth(socket, next){
        // User muss eingeloggt sein
        if(!socket.request.session.user) return next(new Error("Nicht Eingeloggt!"));

        // Der User darf nur eine verbindung gleichzeitig haben
        const userId = socket.request.session.user.id;
        const socketConnections = this.io.sockets.sockets;
        socketConnections.forEach((socket) => {
            if(socket.request.session.user.id === userId) return next(new Error("Irgendwer anders spielt schon!"));
        });

        next();
    }

    /** @param {socketIO.Socket} socket - The socket instance. */
    sendToRightManager(socket){
        socket.on("requestIdentification", () => {
            socket.emit("identification", socket.request.session.user);
        });

        socket.on("hereForLobby", () => {
            new ClientHandler(socket, this.lobbyManager);
        });
    }
}

module.exports = SocketIOManager;