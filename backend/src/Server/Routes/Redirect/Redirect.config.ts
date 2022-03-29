import { Application, Router } from "express";
import RedirectCache from "../../../Cache/Redirect.cache";
import { RedirectModel } from "../../../Database/Models/Redirect.model";

export default class RedirectRouter
{
    private server: Application;
    private router = Router();

    constructor(server: Application)
    {
        this.server = server;
        this.server.use(`/r`, this.router);

        this.router.get("/", async (req, res) =>
        {
            const id = (Object.keys(req.query))[0];
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
    }
}