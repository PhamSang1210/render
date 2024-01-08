import { Schema, model } from "mongoose";

const DOCCUMENT_NAME = "apiKey";
const COLLECTION_NAME = "apiKeys";

const ApiKeyModel = new Schema(
    {
        key: { type: String, required: true, unique: true },
        status: { type: Boolean, default: true },
        premissions: { type: [String], enum: ["0000", "1111", "2222"] },
    },
    {
        collection: COLLECTION_NAME,
    }
);

export default model(DOCCUMENT_NAME, ApiKeyModel);
