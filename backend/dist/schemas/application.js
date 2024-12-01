"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ApplicationSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    appSecretKey: {
        type: String,
        required: [true, "Title is required"],
    },
    isListening: {
        type: Boolean,
        default: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    user: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "User",
        required: [true, "user is required"],
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.default = mongoose_1.default.model("Application", ApplicationSchema);
