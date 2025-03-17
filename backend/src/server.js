const DataBaseManager = require("./Database/DataBaseManager");
const ExpressManager = require("./Express/ExpressManager");
const SocketIOManager = require("./SocketIO/SocketIOManager");

const databaseManager = new DataBaseManager("localhost", "doublesnake");
const expressManger = new ExpressManager(databaseManager);
const socketIOManager = new SocketIOManager(databaseManager, expressManger);