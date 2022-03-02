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
            const cRedirect = RedirectCache.get(id);
            if(cRedirect)
                return res.redirect(cRedirect.redirect);

            // assuming no cache, we find in database
            const redirect = await RedirectModel.findOne({ id: id });
            if(redirect)
            {
                RedirectCache.set(redirect["id"], redirect);
                return res.redirect(redirect.redirect);
            }

            // if not found, we return 404
            return res.status(404).send("Not found");
        });
    }
}