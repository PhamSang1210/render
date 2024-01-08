"use strict";
import mongoose from "mongoose";

const DEV = false;
// Local
// const connectString = `mongodb://localhost:27017/Becomerce`;
// Cloud
const connectString = `mongodb+srv://minhnghi:minhnghi1210@jwtauth.reonhc8.mongodb.net/?retryWrites=true&w=majority`;

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
            await mongoose.connect(connectString);
            console.log("SUCCESS !!!");
        } catch (error) {
            console.log("ERROR");
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
