"use strict";
import mongoose from "mongoose";

const DEV = false;

const stringConenct = {
    local: `mongodb://localhost:27017/Becomerce`,
    cloud: `mongodb+srv://minhnghi:minhnghi1210@jwtauth.reonhc8.mongodb.net/?retryWrites=true&w=majority`,
};
// Local
// const connectString = `mongodb://localhost:27017/Becomerce`;
// Cloud
// const connectString = `mongodb+srv://minhnghi:minhnghi1210@jwtauth.reonhc8.mongodb.net/?retryWrites=true&w=majority`;

class Database {
    constructor() {
        this.connect();
    }

    async connect(TYPE = "MONGODB") {
        if (DEV === true) {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }
        try {
            await mongoose.connect(stringConenct.cloud);
            if (stringConenct.cloud) {
                console.log("CONNECT SUCCESS LOCAL <3");
            }
        } catch (error) {
            console.log("|------------|");
            console.log("|--- ERROR---|");
            console.log("|------------|");
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceDB = Database.getInstance();

export default instanceDB;
