"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const waitlist_controller_1 = require("../controllers/waitlist-controller");
const waitlistRouter = (0, express_1.Router)({ mergeParams: true });
waitlistRouter.route("/").post(waitlist_controller_1.addUserToWaitlist);
// waitlistRouter.use(protect);
waitlistRouter.route("/").get(waitlist_controller_1.getAppWaitlistData);
exports.default = waitlistRouter;
