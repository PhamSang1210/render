"use strict";
import express, { json, urlencoded } from "express";
const app = express();
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import instanceDB from "./database/init.mongodb.js";
import route from "./routes/index.js";

// middleware
app.use(helmet());
app.use(compression());
app.use(json());
app.use(
    urlencoded({
        extended: true,
    })
);
app.use(morgan("dev"));
// init db
instanceDB;
// route
route(app);
// init handle error
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        code: "ERROR",
        msg: error.message || "Internal Server ",
    });
});

export default app;
