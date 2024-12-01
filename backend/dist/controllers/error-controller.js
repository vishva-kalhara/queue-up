"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorProd = exports.sendErrorDev = exports.handleJWTMalformed = exports.handleInvalidObjectIDs = exports.handleValidationErrors = exports.handleDuplicateDocuments = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const handleDuplicateDocuments = (err) => {
    const matchResult = err.errorResponse.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
    if (matchResult) {
        const value = matchResult[0];
        return new appError_1.default(`There is a record associated to ${value}`, 400);
    }
    else
        return new appError_1.default(`Unhandled Error Occured`, 500);
};
exports.handleDuplicateDocuments = handleDuplicateDocuments;
const handleValidationErrors = (err) => {
    const errors = Object.values(err.errors).map((el) => {
        return { field: el.path, message: el.message };
    });
    return new appError_1.default(errors, 400);
};
exports.handleValidationErrors = handleValidationErrors;
const handleInvalidObjectIDs = () => {
    return new appError_1.default("No document found with that ID", 404);
};
exports.handleInvalidObjectIDs = handleInvalidObjectIDs;
const handleJWTMalformed = () => {
    return new appError_1.default("Please sign in to the application!", 401);
};
exports.handleJWTMalformed = handleJWTMalformed;
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: Object.assign(Object.assign({}, err), { name: err.name }),
        message: err.message,
        stack: err.stack,
    });
};
exports.sendErrorDev = sendErrorDev;
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            data: err.errorBody || undefined,
        });
    }
    else {
        console.error("Error 💥💥", err);
        res.status(500).json({
            status: "error",
            message: err.message || "Something went wrong. Please try again later.",
        });
    }
};
exports.sendErrorProd = sendErrorProd;
