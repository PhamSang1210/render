import express from "express";
import { product } from "../../model/product.model.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.json("OK_1");
});

export default router;
