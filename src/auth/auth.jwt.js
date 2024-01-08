"use strict";
import jwt from "jsonwebtoken";
import { AuthFaluire, ConflictRequest } from "../core/error.response.js";
import KeyTokenService from "../services/keyToken.service.js";

const HEADERS = {
    x_api_key: "x_api_key",
    CLIENT_ID: "x_client_id",
    AUTHENZITION: "authenzition",
};

class AuthUtilJWT {
    static async createTokenPair({ payload, publicKey, privateKey }) {
        const accessToken = await jwt.sign(payload, publicKey, {
            // algorithm: "RS256",
            expiresIn: "2d",
        });
        const refreshToken = await jwt.sign(payload, privateKey, {
            // algorithm: "RS256",
            expiresIn: "2d",
        });

        jwt.verify(accessToken, publicKey, (err, decode) => {
            if (err) console.log(err);
            // console.log(decode);
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    static async authentication(req, res, next) {
        // ! Check headers client-id
        const userId = req.headers[HEADERS.CLIENT_ID];
        if (!userId) throw new AuthFaluire("ERROR:x_client_id ");
        // !Find Key Store Key Token Model
        const keyStore = await KeyTokenService.findByUserId(userId);
        if (!keyStore) throw new ConflictRequest("ERROR:UserId");
        //! Throw AccessToken
        const accessToken = req.headers[HEADERS.AUTHENZITION];
        if (!accessToken)
            return res.status(400).json({
                ERROR: "headers authentication",
            });
        try {
            const decodeUser = jwt.verify(accessToken, keyStore.publicKey);
            console.log(
                "🚀 ~ file: auth.jwt.js:55 ~ AuthUtilJWT ~ authentication ~ decodeUser:",
                decodeUser
            );
            if (userId !== decodeUser.userId) {
                throw new AuthFaluire("ERORR USERID");
            }

            req.keyStore = keyStore;

            return next();
        } catch (error) {
            console.log(error);
        }
    }

    static async verifyJWT(token, secert) {
        return await jwt.verify(token, secert);
    }
}

export default AuthUtilJWT;
