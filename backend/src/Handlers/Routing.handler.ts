import { Application } from "express";
import { readdirSync } from "fs";
import { Logger } from "tolfix-lib";
import { HomeDir } from "../Config";

/**
 * 
 * @param {Application} server The server from express
 * @description
 * Handles all routes dynamic
 */
export default function RouteHandler(server: Application): void
{
    Logger.info("Loading routes...");
    const routeDir = HomeDir+"/build/Server/Routes";
    readdirSync(`${routeDir}`).forEach((route) =>
    {
        const routes = readdirSync(`${routeDir}/${route}`).filter((f) => f.endsWith('config.js'));
        for(const file of routes)
        {
            const pull = require(`${routeDir}/${route}/${file}`).default;
            if(pull)
            {
                Logger.api(`Adding new router name ${pull.name ?? ""}`)
                new pull(server);
            }
            continue;
        }
    })
}