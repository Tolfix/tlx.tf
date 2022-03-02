import { IRedirect } from "@interface/Redirect";
import { Schema, model, Document } from "mongoose";

export const RedirectSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    redirect: {
        type: String,
        required: true,
    },
    usedBy: {
        type: Array,
        required: true,
        default: [],
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

export const RedirectModel = model<IRedirect & Document>("redirect", RedirectSchema);