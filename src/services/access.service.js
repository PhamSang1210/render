import bcrypt, { genSalt } from "bcrypt";
import {
    ErrorResponse,
    OK,
    BadRequest,
    AuthFaluire,
} from "../core/error.response.js";
import shopModel from "../model/shop.model.js";
import KeyTokenService from "./keyToken.service.js";
import AuthUtilJWT from "../auth/auth.jwt.js";
import { getInfoData } from "../helpers/getInfoData.js";
import {
    genatorPrivatelicKey,
    genatorPublicKey,
} from "../utils/genatorKey.utils.js";
import ShopService from "./shop.service.js";

class AccessService {
    static async handleRefreshToken(refreshTokens) {
        //!check refreshToken Used
        const checkToken = await KeyTokenService.findByRefreshTokenUsed(
            refreshTokens
        );
        // ! neu co
        if (checkToken) {
            // ! xem no la thang nao
            const { userId, email } = await AuthUtilJWT.verifyJWT(
                refreshTokens,
                checkToken.privateKey
            );

            console.log({ userId, email });

            // ! xoa
            await KeyTokenService.deleteById(userId);

            throw new AuthFaluire("Shop not registerd");
        }

        // ! neu chua tim thay
        const holderShop = await KeyTokenService.findByRefreshToken(
            refreshTokens
        );
        if (!holderShop) throw new AuthFaluire("Shop not registerd 1");
        //! neu chua tim thay xac thuc luon
        const { userId, email } = await AuthUtilJWT.verifyJWT(
            refreshTokens,
            holderShop.privateKey
        );
        //! foundShop
        const foundShop = await ShopService.findByEmail({ email });
        if (!foundShop) throw new AuthFaluire("Shop not registed 2");

        //!tao ra 1 cap token moi
        const tokens = await AuthUtilJWT.createTokenPair({
            payload: {
                userId: foundShop._id,
                email: foundShop.email,
            },
            privateKey: holderShop.privateKey,
            publicKey: holderShop.publicKey,
        });

        console.log(
            `---------------handleRefreshToken--------------------------`
        );
        console.log("CAST: ", refreshTokens);
        console.log("TOKENS: ", tokens);
        //! ATOMIC
        console.log("sadsadasdasgdasfd: ", tokens.refreshToken);
        //! update 1 lan refreshToken dung 1 lan
        console.log(
            `----------------UPDATE USED----------------------------------`
        );
        console.log("refreshTokenUsed: ", refreshTokens);

        await holderShop.updateOne({
            $set: {
                refreshToken: tokens.refreshToken,
            },
            $addToSet: {
                refreshTokenUsed: refreshTokens,
            },
        });

        return {
            user: { userId, email },
            tokens,
        };
    }
    static async logout(keyStore) {
        const delKey = await KeyTokenService.removeById(keyStore._id);
        console.log(delKey);
        return delKey;
    }

    static async login({ email, password }) {
        //! Check Email
        const foundShop = await ShopService.findByEmail({ email });
        if (!foundShop) throw new OK("Cần Đăng Ký Để Đăng Nhập");
        // ! Check Password
        const matchPassword = await bcrypt.compare(
            password,
            foundShop.password
        );
        if (!matchPassword) throw new OK("Mật Khẩu Không Chính Xác !");
        //! Create tokens
        const publicKey = genatorPublicKey();
        const privateKey = genatorPrivatelicKey();

        const { _id: userId, email: emailShop } = foundShop;

        const payload = {
            userId,
            email: emailShop,
        };
        const tokens = await AuthUtilJWT.createTokenPair({
            payload,
            publicKey,
            privateKey,
        });

        //! Save DB

        await KeyTokenService.createKeyToken({
            userId,
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken,
        });

        return {
            msg: "Login Successfully",
            data: foundShop,
            tokens,
        };
    }
    static async register({ name, email, password }) {
        const nameExist = await shopModel.exists({ name }).lean();
        const emailExist = await shopModel.exists({ email }).lean();

        if (nameExist) {
            throw new ErrorResponse("ERROR:Name exist", 401);
        }
        if (emailExist) {
            throw new ErrorResponse("ERROR:Email Exist", 401);
        }

        const salt = await genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newShop = await shopModel.create({
            name,
            email,
            password: hashPassword,
        });

        // Destructuring

        if (newShop) {
            const { _id: userId, email } = newShop;
            // create privateKey,publicKey

            // const { publicKey, privateKey } = crypto.generateKeyPairSync(
            //     "rsa",
            //     {
            //         modulusLength: 4096,
            //         privateKeyEncoding: {
            //             type: "pkcs1",
            //             format: "pem",
            //         },
            //         publicKeyEncoding: {
            //             type: "pkcs1",
            //             format: "pem",
            //         },
            //     }
            // );

            // storegate db
            const privateKey = genatorPrivatelicKey();
            const publicKey = genatorPublicKey();

            const publicKeyString = await KeyTokenService.createKeyToken(
                userId,
                publicKey,
                privateKey
            );

            // create JWT
            const payload = {
                userId,
                email,
            };
            const tokens = await AuthUtilJWT.createTokenPair({
                payload,
                publicKey,
                privateKey,
            });

            return {
                data: getInfoData(newShop, ["_id", "name", "email"]),
                tokens,
            };
        }

        return {
            code: 409,
            msg: "Can't Register !!!",
        };
    }
}
export default AccessService;
