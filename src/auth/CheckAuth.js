"use strict";
import { FORBIDDEN } from "../core/error.response.js";
import apiKeyModel from "../model/apiKey.model.js";
import ApiKey from "./../services/apiKey.service.js";
import crypto from "crypto";
const HEADER = {
    API_KEY: "x_api_key",
};

class CheckAuth {
    static async apiKey(req, res, next) {
        const key = req.headers[HEADER.API_KEY];
        if (!key) throw new FORBIDDEN("ERROR:FORBIDDEN [HEADER:KEY]");
        const objKey = await ApiKey.findByKey(key);
        if (!objKey) throw new FORBIDDEN("ERROR:FORBIDDEN [KEY]");

        req.objKey = objKey;
        console.log(req);

        return next();
    }

    static premissions(premiss) {
        return (req, res, next) => {
            const premission = req.objKey.premissions;
            if (!premission) {
                return res.status(400).json({
                    code: 400,
                    msg: "ERROR:FORBIDDEN PREMISSION",
                });
            }

            const checkPre = req.objKey.premissions.includes(premiss);
            if (!checkPre) {
                return res.status(400).json({
                    code: 400,
                    msg: "ERROR:FORBIDDEN PREMISSION",
                });
            }

            return next();
        };
    }
}

export default CheckAuth;
