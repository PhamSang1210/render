"use strict";
import app from "./src/app.js";

const PORT = 3055;

const server = app.listen(PORT, () => {
    console.log(`Listen at PORT: http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => {
        console.log(`Express Shutdown !!!`);
    });
});
