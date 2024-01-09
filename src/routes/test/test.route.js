import express from "express";
import { product } from "../../model/product.model.js";
const router = express.Router();

router.get("/", (req, res) => {
    const data = {
        author: "MINH_NGHI",
    };
    for (let key in req.query) {
        data[key] = req.query[key];
    }

    res.json(data);
});

export default router;
