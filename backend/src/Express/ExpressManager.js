const express = require("express");
const sessions = require("express-session");
const bp = require("body-parser");
const path = require("path");
const DataBaseManager = require("../Database/DataBaseManager");
const AccountRoute = require("./Routes/AccountRoute");
const DashboardRoute = require("./Routes/DashboardRoute");
const { existsSync } = require("fs");
require("dotenv").config();

class ExpressManager{
    /**@param {DataBaseManager} dbManager*/
    constructor(dbManager){
        this.db = dbManager;

        this.app = express();

        this.sessionMiddleware = sessions({
            secret: process.env.SESSION_KEY,
            saveUninitialized: false,
            resave: false,
            cookie: {maxAge: 24 * 60 * 60 * 1000}
        });

        this.app.use((req, res, next) => { this.logger(req, res, next) });
        this.app.use(this.sessionMiddleware);
        this.app.use((req, res, next) => { this.needAuth(req, res, next) });
        this.app.use(bp.urlencoded({extended: false}));
        this.app.use(express.json());
        this.app.use(bp.json());
        this.app.use(express.static(path.join(__dirname, process.env.FRONTEND_PATH || "./../../../frontend")));
        console.log(path.join(__dirname, process.env.FRONTEND_PATH || "./../../../frontend"));
        console.log(existsSync(path.join(__dirname, process.env.FRONTEND_PATH || "./../../../frontend")));

        // Routen wo man für Angemeldet sein muss
        this.authRoutes = [
            "/api/dashboard",
            "/dashboard"
        ];

        // Routen Einbinden
        this.app.use("/api/account/", new AccountRoute(this.db).router);
        this.app.use("/api/dashboard/", new DashboardRoute(this.db).router);
    }

    /**@param {express.Request} req @param {express.Response} res @param {express.NextFunction} next*/
    logger(req, res, next){
        const date = new Date();
        console.log(`${date.toTimeString().slice(0, 8)} | ${req.method} | ${req.url}`);
        next();
    }

    /**@param {express.Request} req @param {express.Response} res @param {express.NextFunction} next*/
    needAuth(req, res, next){
        let isProtectedRoute = false;
        this.authRoutes.forEach(route => {
            if(req.url.startsWith(route)) isProtectedRoute = true;
        });

        // Geht zum Login wenn User versucht Routen aufzurufen wofür man angemeldet sein muss
        if(isProtectedRoute && !req.session.user?.isSet) return res.redirect("/login");

        // Geht zum Dashboard wenn der Nutzer versucht sich zu registrieren oder einzuloggen wenn er angemeldet ist
        if(req.session.user?.isSet && (req.url.startsWith("/login") || req.url.startsWith("/register"))){
            return res.redirect("/dashboard");
        }

        next();
    }
}

module.exports = ExpressManager;