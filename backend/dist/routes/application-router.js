"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_controller_1 = require("../controllers/application-controller");
const protect_1 = require("../middlewares/protect");
const waitlist_router_1 = __importDefault(require("./waitlist-router"));
const applicationRouter = require("express").Router();
applicationRouter.use(protect_1.protect);
applicationRouter.route("/my-apps").get(application_controller_1.getMyApplications);
applicationRouter.route("/").post(application_controller_1.createApplication);
applicationRouter.route("/overview-stats/:id").get(application_controller_1.appOverviewStats);
// Forward request to waitlist router
applicationRouter.use("/:id/app-waitlist", waitlist_router_1.default);
applicationRouter
    .route("/:id")
    .get(application_controller_1.getOneApplication)
    .patch(application_controller_1.updateApplication)
    .delete(application_controller_1.deleteApplication);
exports.default = applicationRouter;
