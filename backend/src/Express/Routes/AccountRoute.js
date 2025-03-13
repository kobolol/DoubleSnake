const express = require("express");
const User = require("../../Database/UserManager/User");
const DataBaseManager = require("../../Database/DataBaseManager");
const bcrypt = require("bcrypt");

class AccountRoute {
    /**@param {DataBaseManager} dbManager*/
    constructor(dbManager) {
        this.router = express.Router();

        this.db = dbManager;

        this.router.post("/register", async (req, res) => await this.register(req, res));
        this.router.post("/login", async (req, res) => await this.login(req, res));
        this.router.post("/update", async (req, res) => await this.update(req, res));
        this.router.get("/logout", async (req, res) => await this.logout(req, res));
    }

    /**@param {express.Request} req @param {express.Response}*/
    async register(req, res){
        const body = req.body;
        if(!body.username || !body.password) return res.redirect("/register?error=1");

        const user = new User(body);

        const result = await this.db.usermanager.createUser(user);
        if(result !== 1) return res.redirect("/register?error=2");

        res.redirect("/login");
    }

    /**@param {express.Request} req @param {express.Response}*/
    async login(req, res){
        const body = req.body;
        if(!body.username || !body.password) return res.redirect("/login?error=1")

        const user = await this.db.usermanager.getUser({username: body.username});
        if(!user) return res.redirect("/login?error=2")

        const passwordMatch = await user.doesPassMatch(body.password);
        if(!passwordMatch) return res.redirect("/login?error=2")

        req.session.user = {
            id: user.id,
            username: user.username,
            isSet: true
        }

        res.redirect("/dashboard")
    }

    /**@param {express.Request} req @param {express.Response}*/
    async update(req, res){
        const user = await this.db.usermanager.getUser({id: req.session.user.id});
        const body = req.body;

        if(user.username !== body.username){
            const checkUser = await this.db.usermanager.getUser({username: body.username});
            if(checkUser) return res.redirect("/dashboard/account/?error=1");

            user.username = body.username;
        }

        user.email = body.email;
        user.fullName = body.fullName;

        if(body.password !== ""){
            const passHash = await bcrypt.hash(body.password, 10);
            user.password = passHash;
        }

        await this.db.usermanager.updateUser(user.id, user);

        res.redirect("/dashboard/account");
    }

    /**@param {express.Request} req @param {express.Response}*/
    async logout(req, res){
        req.session.destroy();
        res.redirect("/");
    }
}

module.exports = AccountRoute;