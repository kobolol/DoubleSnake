const express = require("express");
const User = require("../../Database/UserManager/User");
const DataBaseManager = require("../../Database/DataBaseManager");

class DashboardRoute{
    /**@param {DataBaseManager} dbManager*/
    constructor(dbManager){
        this.router = express.Router();

        this.db = dbManager;

        this.router.get("/", async (req, res) => await this.userInfo(req, res))
    }

    /**@param {express.Request} req @param {express.Response} res*/
    async userInfo(req, res){
        const user = await this.db.usermanager.getUser({id: req.session.user.id});

        res.json(user.toUserJSON());
    }
}

module.exports = DashboardRoute;