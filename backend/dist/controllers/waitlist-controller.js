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
exports.getAppWaitlistData = exports.addUserToWaitlist = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const user_1 = __importDefault(require("../schemas/user"));
const application_1 = __importDefault(require("../schemas/application"));
const waitlist_1 = __importDefault(require("../schemas/waitlist"));
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const addUserToWaitlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Checks whether the request body is invalid
        if (!req.body.appSecretKey || !req.body.data.email)
            return next(new appError_1.default("Invalid request body!", 400));
        const { appSecretKey, data } = req.body;
        if (!req.headers.authorization ||
            !req.headers.authorization.startsWith("Bearer"))
            return next(new appError_1.default("Authorization header is required!", 401));
        const currUser = yield user_1.default
            .findOne()
            .where("apiKey", req.headers.authorization.split(" ")[1])
            .select("id");
        if (!currUser)
            return next(new appError_1.default("Invalid User API Key!", 404));
        const app = yield application_1.default
            .findOne()
            .where("appSecretKey", appSecretKey)
            .where("user", currUser.id)
            .populate("user", "_id")
            .select("_id title");
        if (!app)
            return next(new appError_1.default(`Invalid 'appSecretKey' or app not found!`, 404));
        const hasUserWaitlist = yield waitlist_1.default.aggregate([
            {
                $match: {
                    app: {
                        oId: app._id,
                    },
                    email: {
                        oId: data.email,
                    },
                },
            },
            {
                $project: { _id: 1 },
            },
        ]);
        if (hasUserWaitlist.length != 0)
            return next(new appError_1.default(`You are already registered on the waitlist!`, 400));
        const filteredObj = {
            email: undefined,
            firstName: undefined,
            lastName: undefined,
        };
        if (data.email)
            filteredObj.email = data.email;
        if (data.firstName)
            filteredObj.firstName = data.firstName;
        if (data.lastName)
            filteredObj.lastName = data.lastName;
        const addedUser = yield waitlist_1.default.create({
            app: app._id,
            email: filteredObj.email,
            firstName: filteredObj.firstName,
            lastName: filteredObj.lastName,
        });
        const record = {
            app: app.title,
            email: addedUser.email,
            firstName: addedUser.firstName,
            lastName: addedUser.lastName,
            createdAt: addedUser.createdAt,
            isActive: addedUser.isActive,
        };
        res.status(201).json({
            status: "success",
            record,
        });
    }
    catch (error) {
        console.error(error);
        next(new appError_1.default("Unhandled Exception", 500));
    }
});
exports.addUserToWaitlist = addUserToWaitlist;
const getAppWaitlistData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appId = req.params.id;
        if (!appId)
            return res.redirect("/dashboard");
        console.log(req.query);
        const limit = req.query.limit ? Number(req.query.limit) : 25;
        const page = req.query.page ? Number(req.query.page) : 1;
        const sort = req.query.sort
            ? req.query.sort
            : "desc";
        const [data, totalCount] = yield Promise.all([
            waitlist_1.default
                .find()
                .where("app", appId)
                .limit(limit)
                .skip(limit * page)
                .populate("app", "_id")
                .sort({ createdAt: sort }),
            waitlist_1.default.aggregate([
                { $match: { app: new ObjectId(appId) } },
                { $count: "number" },
            ]),
        ]);
        res.status(200).json({
            status: "success",
            count: data.length,
            totalCount: totalCount[0].number,
            data,
        });
    }
    catch (error) {
        console.error(error);
        next(new appError_1.default("Unhandled Exception", 500));
    }
});
exports.getAppWaitlistData = getAppWaitlistData;
