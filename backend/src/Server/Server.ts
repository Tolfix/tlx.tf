import express from "express";
import cors from "cors";
import session from "express-session";
import { Express_Session_Secret, Frontend_Domain, Full_Domain, PORT } from "../Config";
import RouteHandler from "../Handlers/Routing.handler";
import rateLimiter from "express-rate-limit"
import { Logger } from "tolfix-lib";
import { Server } from "http"
import SocketIo from "../Socket/Socket";

export const server = express();
const app = new Server(server)
export const io = (new SocketIo(app)).io;

server.use(cors({
    origin: "*",
    credentials: true,
}));

const sessionMiddleWare = session({
    secret: Express_Session_Secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/",
        maxAge: 30*24*60*60*1000,
    }
});

server.use(sessionMiddleWare);

server.use(express.urlencoded({ extended: true }));
server.use((req, res, next) => 
{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    express.json({verify: (req, res, buf, encoding) =>
    {
        // @ts-ignore
        req.rawBody = buf;
    }})(req, res, next);
});

server.use((req, res, next) =>
{
    res.setHeader('X-Powered-By', 'Tolfix');
    next();
});

//Limiter, to reduce spam if it would happen.
const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    message: "Too many requests, please try again later."
});

server.use(limiter);

RouteHandler(server);

app.listen(PORT, () => Logger.api(`Listing on ${PORT} | ${Full_Domain}`));

server.use("*", (req, res) =>
{
    // Redirect to the frontend
    return res.redirect(`${Full_Domain}/app`);
});

import "../Socket/Emit/Redirect.emit";