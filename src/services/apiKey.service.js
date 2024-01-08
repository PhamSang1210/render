import apiKeyModel from "../model/apiKey.model.js";

class ApiKey {
    static async findByKey(key) {
        return await apiKeyModel.findOne({ key }).lean();
    }
}

export default ApiKey;
