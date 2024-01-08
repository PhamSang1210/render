"use strict";
import crypto from "crypto";

const genatorPublicKey = () => {
    return crypto.randomBytes(64).toString("hex");
};
const genatorPrivatelicKey = () => {
    return crypto.randomBytes(64).toString("hex");
};

export { genatorPublicKey, genatorPrivatelicKey };
