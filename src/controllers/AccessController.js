import { OK, Register } from "../core/success.response.js";
import AccessService from "../services/access.service.js";

class AccessController {
    static async handleRefreshToken(req, res, next) {
        return new OK({
            message: "Get Token Succesfully",
            statusCode: 200,
            metaData: await AccessService.handleRefreshToken(
                req.body.refreshToken
            ),
        }).send(res);
    }
    static async logout(req, res, next) {
        return new OK({
            message: "Logout Successfully",
            statusCode: 200,
            metaData: await AccessService.logout(req.keyStore),
        }).send(res);
    }
    static async login(req, res, next) {
        return new OK({
            message: "OK",
            statusCode: 200,
            metaData: await AccessService.login(req.body),
        }).send(res);
    }
    static async register(req, res, next) {
        return new Register({
            message: "Register SuccessFully",
            statusCode: 201,
            metaData: await AccessService.register(req.body),
        }).send(res);
    }
}

export default AccessController;
