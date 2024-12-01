"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMe = exports.getMe = exports.syncUserWithDB = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const user_1 = __importDefault(require("../schemas/user"));
const crypto_1 = require("crypto");
const express_1 = require("@clerk/express");
const syncUserWithDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: externalId } = (0, express_1.getAuth)(req);
        let loggedUser = yield user_1.default.findOne({ externalId });
        if (!loggedUser) {
            const apiKey = (0, crypto_1.randomBytes)(16 / 2).toString("hex");
            const user = yield express_1.clerkClient.users.getUser(externalId);
            loggedUser = yield user_1.default.create({
                email: user.emailAddresses[0].emailAddress,
                externalId,
                apiKey,
                isActive: true,
            });
        }
        res.status(200).json({
            isSynced: loggedUser ? true : false,
        });
    }
    catch (error) {
        console.error(error);
        return next(new appError_1.default("Unhandled exception occured!", 500));
    }
});
exports.syncUserWithDB = syncUserWithDB;
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: externalId } = (0, express_1.getAuth)(req);
        const loggedUser = yield user_1.default.findOne({ externalId });
        // if (!loggedUser) return res.redirect("/sign-in");
        res.status(200).json({ status: "success", user: loggedUser });
    }
    catch (error) {
        console.error(error);
        return next(new appError_1.default("Unhandled exception occured!", 500));
    }
});
exports.getMe = getMe;
const updateMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: externalId } = (0, express_1.getAuth)(req);
        const loggedUser = yield user_1.default.findOne({ externalId });
        const newUser = yield user_1.default.findByIdAndUpdate(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser._id, {
            apiKey: req.body.apiKey,
        }, {
            new: true,
        });
        res.status(200).json({ status: "success", user: newUser });
    }
    catch (error) {
        console.error(error);
        return next(new appError_1.default("Unhandled exception occured!", 500));
    }
});
exports.updateMe = updateMe;
