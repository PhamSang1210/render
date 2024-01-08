"use strict";
import keyTokenModel from "../model/keyToken.model.js";
import { Types } from "mongoose";

class KeyTokenService {
    static async createKeyToken({
        userId,
        publicKey,
        privateKey,
        refreshToken,
    }) {
        // ! lv 1
        // const keys = await keyTokenModel.create({
        //     user: userId,
        //     publicKey,
        //     privateKey,
        // });
        // return keys ? publicKey : null;
        // ! lv xxxx
        const filter = {
                user: userId,
            },
            update = {
                publicKey,
                privateKey,
                refreshTokenUsed: [],
                refreshToken,
            },
            options = {
                new: true,
                upsert: true,
            };

        const tokens = await keyTokenModel.findOneAndUpdate(
            filter,
            update,
            options
        );

        return tokens ? tokens : null;
    }

    static async findByUserId(userId) {
        return await keyTokenModel
            .findOne({
                user: new Types.ObjectId(userId),
            })
            .lean();
    }

    static async removeById(id) {
        return await keyTokenModel.deleteOne({ _id: new Types.ObjectId(id) });
    }

    static async findByRefreshTokenUsed(refreshToken) {
        return await keyTokenModel
            .findOne({ refreshTokenUsed: refreshToken })
            .lean();
    }
    static async findByRefreshToken(refreshToken) {
        return await keyTokenModel.findOne({ refreshToken });
    }

    static async deleteById(id) {
        return await keyTokenModel.deleteOne({ user: new Types.ObjectId(id) });
    }
}

export default KeyTokenService;
