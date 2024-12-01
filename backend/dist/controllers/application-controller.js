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
exports.appOverviewStats = exports.deleteApplication = exports.updateApplication = exports.createApplication = exports.getOneApplication = exports.getMyApplications = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const application_1 = __importDefault(require("../schemas/application"));
const crypto_1 = require("crypto");
const express_1 = require("@clerk/express");
const user_1 = __importDefault(require("../schemas/user"));
const user_2 = __importDefault(require("../schemas/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const application_2 = __importDefault(require("../schemas/application"));
const waitlist_1 = __importDefault(require("../schemas/waitlist"));
const date_fns_1 = require("date-fns");
const ObjectId = mongoose_1.default.Types.ObjectId;
const getMyApplications = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        const logged = yield user_2.default.findOne({
            externalId: userId,
        });
        const apps = yield application_1.default.find()
            .where("user")
            .equals(logged === null || logged === void 0 ? void 0 : logged.id)
            .populate("user", "id")
            .select("isListening title")
            .sort({ createdAt: "desc" });
        const updatedApps = [];
        yield Promise.all(apps.map((app) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const appId = app.id;
            const [userCount, lastReq] = yield Promise.all([
                waitlist_1.default.aggregate([
                    {
                        $match: {
                            app: new ObjectId(appId),
                            isActive: true,
                        },
                    },
                    { $count: "number" },
                ]),
                waitlist_1.default.aggregate([
                    {
                        $match: {
                            app: new ObjectId(appId),
                        },
                    },
                    { $sort: { createdAt: -1 } },
                    { $project: { createdAt: 1 } },
                ]),
            ]);
            updatedApps.push({
                _id: app._id,
                isListening: app.isListening,
                userCount: ((_a = userCount[0]) === null || _a === void 0 ? void 0 : _a.number) || 0, // Ensure optional chaining to avoid undefined errors
                lastReq: lastReq.length
                    ? (0, date_fns_1.formatDistance)(new Date(lastReq[0].createdAt), new Date(), {
                        addSuffix: true,
                    })
                    : "No requests found", // Handle case with no last request
                isActive: app.isActive,
                title: app.title,
            });
        })));
        res.status(200).json({
            success: "success",
            count: updatedApps.length,
            apps: updatedApps,
        });
    }
    catch (error) {
        console.log(error);
        return next(new appError_1.default("Unhandled exception occured!", 500));
    }
});
exports.getMyApplications = getMyApplications;
const getOneApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        const loggedUser = yield user_2.default.findOne({
            externalId: userId,
        });
        const { id } = req.params;
        const app = yield application_1.default.findOne()
            .where("user", loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id)
            .where("_id", id)
            .populate("user", "_id");
        if (!app)
            return res.redirect("/not-found");
        return res.status(200).json({
            status: "success",
            app,
        });
    }
    catch (error) {
        console.error(error);
        return next(new appError_1.default("Unhandled exception occured!", 500));
    }
});
exports.getOneApplication = getOneApplication;
const createApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: externalId } = (0, express_1.getAuth)(req);
        if (!req.body.title)
            return next(new appError_1.default("Title is required!", 400));
        const logged = yield user_2.default.findOne({
            externalId,
        });
        // Check whether there is already an app with the same title
        const hasApp = yield application_1.default.findOne()
            .where("user", logged === null || logged === void 0 ? void 0 : logged.id)
            .where("title", req.body.title)
            .populate("user", "id");
        if (hasApp)
            return next(new appError_1.default("There is already an application with the same title!", 400));
        // Generate app Secret
        const appSecretKey = (0, crypto_1.randomBytes)(16 / 2).toString("hex");
        let loggedUser = yield user_1.default.findOne({ externalId });
        const application = yield application_1.default.create({
            title: req.body.title,
            appSecretKey,
            user: loggedUser._id,
        });
        res.status(201).json({
            success: "success",
            application,
        });
    }
    catch (error) {
        return next(new appError_1.default("Unhandled exception occured!", 500));
    }
});
exports.createApplication = createApplication;
const updateApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedApp = yield application_1.default.findOneAndUpdate({
            _id: req.params.id,
        }, req.body, {
            new: true,
        });
        res.status(200).json({
            success: "success",
            app: updatedApp,
        });
    }
    catch (error) {
        console.error(error);
        return next(new appError_1.default("Unhandled exception occured!", 500));
    }
});
exports.updateApplication = updateApplication;
const deleteApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const app = yield application_2.default.findById(id);
        if (!app)
            return next(new appError_1.default("App Not Found!", 404));
        yield application_2.default.findByIdAndDelete(id);
        res.status(204).json({
            status: "success",
        });
    }
    catch (error) {
        console.error(error);
        return next(new appError_1.default("Unhandled exception occured!", 500));
    }
});
exports.deleteApplication = deleteApplication;
const appOverviewStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const [appStatus, totalWaitlistUsers, chartData] = yield Promise.all([
            application_2.default.aggregate([
                { $match: { _id: new ObjectId(id) } },
                {
                    $project: {
                        isListening: 1,
                    },
                },
            ]),
            waitlist_1.default.aggregate([
                {
                    $match: {
                        app: new ObjectId(id),
                        isActive: true,
                    },
                },
                { $count: "number" },
            ]),
            waitlist_1.default.aggregate([
                {
                    $addFields: {
                        date: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$createdAt",
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: "$date", // Group by the extracted date
                        value: { $sum: 1 }, // Count the number of documents
                    },
                },
                {
                    $sort: { _id: 1 }, // Sort by date (optional)
                },
            ]),
        ]);
        res.status(200).json({
            status: "success",
            isListening: appStatus[0].isListening,
            totalWaitlistUsers: ((_a = totalWaitlistUsers[0]) === null || _a === void 0 ? void 0 : _a.number) || 0,
            chartData,
        });
    }
    catch (error) {
        console.error(error);
        next(new appError_1.default("Unhandled Exception", 500));
    }
});
exports.appOverviewStats = appOverviewStats;
