"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = new mongoose_1.default.Schema({
    createdAt: {
        type: Date,
        default: new Date(),
    },
    externalId: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
    },
    apiKey: {
        type: String,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.default = mongoose_1.default.model("User", User);
