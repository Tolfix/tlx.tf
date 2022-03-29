import { IRedirect } from "@interface/Redirect";
import { RedirectModel } from "../Database/Models/Redirect.model";

// @ts-ignore
const CacheRedirects: Map<IRedirect["id"], IRedirect> & {
    save(id: string): Promise<boolean>;
} = new Map<IRedirect["id"], IRedirect>();

Object.defineProperty(CacheRedirects, "save", {
    value: function(id: string)
    {
        return new Promise(async (resolve) =>
        {
            let redirect = await RedirectModel.findOne({
                id: id,
            });
            if(!redirect)
                return resolve(false);

            // @ts-ignore
            redirect = this.get(id);
            await RedirectModel.updateOne({
                id: id,
            // @ts-ignore
            }, redirect, { upsert: true });

            return resolve(true);
        });
    }
});

export default CacheRedirects;