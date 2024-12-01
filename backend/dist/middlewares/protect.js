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
exports.protect = void 0;
const express_1 = require("@clerk/express");
const user_1 = __importDefault(require("../schemas/user"));
const appError_1 = __importDefault(require("../utils/appError"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId: externalId } = (0, express_1.getAuth)(req);
    if (!externalId)
        return res.redirect("/sign-in");
    const loggedUser = yield user_1.default.findOne({
        externalId,
        isActive: true,
    });
    if (!loggedUser)
        return res.redirect("/dashboard");
    if (!(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.isActive))
        return next(new appError_1.default("User is banned!", 403));
    next();
});
exports.protect = protect;
