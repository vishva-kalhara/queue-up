"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_controller_1 = require("../controllers/error-controller");
exports.default = (err, _req, res, _next) => {
    let error = err;
    error.statusCode = err.statusCode || 500;
    error.status = err.status || "error";
    if (process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "test") {
        if (error.name == "ValidationError")
            error = (0, error_controller_1.handleValidationErrors)(error);
        if (error.code === 11000)
            error = (0, error_controller_1.handleDuplicateDocuments)(error);
        if (error.statusCode === 500 &&
            error.name === "CastError" &&
            error.kind === "ObjectId")
            error = (0, error_controller_1.handleInvalidObjectIDs)();
        if ((error === null || error === void 0 ? void 0 : error.name) === "JsonWebTokenError" ||
            (error === null || error === void 0 ? void 0 : error.name) == "TokenExpiredError") {
            error = (0, error_controller_1.handleJWTMalformed)();
        }
        return (0, error_controller_1.sendErrorProd)(error, res);
    }
    return (0, error_controller_1.sendErrorDev)(error, res);
};
