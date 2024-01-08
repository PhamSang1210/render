"use strict";
class SuccessReponse {
    constructor({ message, statusCode, metaData = {} }) {
        this.message = message;
        this.statusCode = statusCode;
        this.metaData = metaData;
    }

    send(res, headers = {}) {
        return res.status(this.statusCode).json(this);
    }
}

class Register extends SuccessReponse {
    constructor({ message, statusCode, metaData = {} }) {
        super({ message, statusCode, metaData });
    }
}

class OK extends SuccessReponse {
    constructor({ message, statusCode, metaData = {} }) {
        super({ message, statusCode, metaData });
    }
}

export { SuccessReponse, Register, OK };
