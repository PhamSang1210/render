import { Schema, model } from "mongoose";

const DOCCUMENT_NAME = "Shop";
const COLLECTION_NAME = "Shops";

const shopModel = new Schema(
    {
        name: { type: String, required: true, unique: true, maxLength: 150 },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        status: { type: String, enum: ["active", "inactive"] },
        role: { type: Array, default: [] },
        verify: { type: Boolean, default: false },
    },
    {
        collection: COLLECTION_NAME,
    }
);

export default model(DOCCUMENT_NAME, shopModel);
