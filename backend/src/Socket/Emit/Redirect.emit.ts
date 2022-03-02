import { Logger } from "tolfix-lib";
import RedirectCache from "../../Cache/Redirect.cache";
import { RedirectModel } from "../../Database/Models/Redirect.model";
import { io } from "../../Server/Server";

let updateAmount = () =>
{
    // Every 10 min we update from database
    RedirectModel.find({}).then((redirects: any) =>
    {
        redirects.forEach((redirect: any) =>
        {
            RedirectCache.set(redirect.id, redirect);
        });
    });
}

updateAmount();

setInterval(updateAmount, 600000);

setInterval(() => {

    const cRedirect = [...RedirectCache.values()];
    Logger.api(`Sending ${cRedirect.length} redirects to clients socket`);
    io.emit("redirect", {
        amount: cRedirect.length,
    });

}, (1000)*10);