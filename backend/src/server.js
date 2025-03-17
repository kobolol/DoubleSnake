const DataBaseManager = require("./Database/DataBaseManager");
const ExpressManager = require("./Express/ExpressManager");
const SocketIOManager = require("./SocketIO/SocketIOManager");
require("dotenv").config();

const databaseManager = new DataBaseManager(process.env.DB_HOST || "localhost", "doublesnake");
const expressManger = new ExpressManager(databaseManager);
const socketIOManager = new SocketIOManager(databaseManager, expressManger);