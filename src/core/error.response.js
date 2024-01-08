import { ReasonPhrases, StatusCodes } from "http-status-codes";

class ErrorResponse extends Error {
    constructor(message = ReasonPhrases.OK, status = StatusCodes.OK) {
        super(message);
        this.status = status;
    }
}

class BadRequest extends ErrorResponse {
    constructor(
        message = ReasonPhrases.BAD_REQUEST,
        status = StatusCodes.BAD_REQUEST
    ) {
        super(message, status);
    }
}

class OK extends ErrorResponse {
    constructor(message = ReasonPhrases.OK, status = StatusCodes.OK) {
        super(message, status);
    }
}

class ConflictRequest extends ErrorResponse {
    constructor(
        message = ReasonPhrases.CONFLICT,
        status = StatusCodes.CONFLICT
    ) {
        super(message, status);
    }
}

class FORBIDDEN extends ErrorResponse {
    constructor(
        message = ReasonPhrases.FORBIDDEN,
        status = StatusCodes.FORBIDDEN
    ) {
        super(message, status);
    }
}

class AuthFaluire extends ErrorResponse {
    constructor(
        message = ReasonPhrases.FORBIDDEN,
        status = StatusCodes.FORBIDDEN
    ) {
        super(message, status);
    }
}

export {
    ErrorResponse,
    BadRequest,
    ConflictRequest,
    FORBIDDEN,
    OK,
    AuthFaluire,
};
