import { Schema, model, Types } from "mongoose";

const DOCCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productShema = new Schema(
    {
        product_name: { type: String, required: true },
        product_thumb: { type: String, required: true },
        product_description: { type: String },
        product_price: { type: Number, required: true },
        product_quanlity: { type: Number, required: true },
        product_type: {
            type: String,
            required: true,
            enum: ["Electronics", "Clothing", "Furniture"],
        },
        product_shop: { type: Schema.Types.ObjectId, ref: "Shop" },
        product_attributes: { type: Schema.Types.Mixed, required: true },
    },
    {
        collection: COLLECTION_NAME,
    }
);

//! define the "product_type = closthing"

const clothingSchema = new Schema(
    {
        brand: { type: String, required: true },
        size: String,
        meterial: String,
    },
    {
        collection: "clothes",
    }
);

const electronicSchema = new Schema(
    {
        brand: { type: String, required: true },
        size: String,
        meterial: String,
    },
    {
        collection: "electronics",
    }
);

const product = model(DOCCUMENT_NAME, productShema);
const electronic = model("Electronics", productShema);
const clothing = model("Closthing", clothingSchema);

export { product, electronic, clothing };
