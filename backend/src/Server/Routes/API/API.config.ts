import { Application, Router } from "express";
import RedirectCache from "../../../Cache/Redirect.cache";
import { RedirectModel } from "../../../Database/Models/Redirect.model";
import crypto from "crypto";
import { Logger } from "tolfix-lib";
import { Full_Domain } from "../../../Config";

export default class APIRouter
{
    private server: Application;
    private router = Router();

    constructor(server: Application)
    {
        this.server = server;
        this.server.use(`/api`, this.router);

        this.router.get("/redirects/amount", async (req, res) =>
        {
            const amount = await RedirectModel.countDocuments();
            return res.json({ amount: amount });
        });

        this.router.get("/redirect/:id", async (req, res) =>
        {
            const id = req.params.id;
            let cRedirect = RedirectCache.get(id);
            if(cRedirect)
            {
                res.redirect(cRedirect.redirect);
                cRedirect.usedBy.push((req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string);
                return RedirectCache.save(id);
            }
            // assuming no cache, we find in database
            const redirect = await RedirectModel.findOne({ id: id });
            if(redirect)
            {
                redirect.usedBy.push((req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string);
                RedirectCache.set(redirect["id"], redirect);
                res.redirect(redirect.redirect);
                return RedirectCache.save(redirect["id"]);
            }

            // if not found, we return 404
            return res.status(404).send("Not found");
        });

        this.router.post("/redirect", async (req, res) =>
        {
            const { redirect } = req.body;
            Logger.api(`New request of creating a redirect of`, redirect)
            if(!redirect)
                return res.status(400).send("Bad request");

            // Validate redirect url if url with regex
            const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
            
            if(!regex.test(redirect))
                return res.status(400).send("Bad request");

            const id = crypto.randomBytes(4).toString("hex");

            const newRedirect = await (new RedirectModel({
                id: id,
                redirect: redirect,
                usedBy: [],
            })).save();

            Logger.info(`Created a redirect of id`, newRedirect["id"]);

            RedirectCache.set(newRedirect["id"], newRedirect);
            
            return res.json({
                redirect: newRedirect.redirect,
                id: newRedirect.id,
                redirect_url: `${Full_Domain}/r?${newRedirect["id"]}`,
            });
        });

    }
}