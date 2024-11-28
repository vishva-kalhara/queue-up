import {
    appOverviewStats,
    createApplication,
    deleteApplication,
    getMyApplications,
    getOneApplication,
    updateApplication,
} from "../controllers/application-controller";
import { protect } from "../middlewares/protect";
import waitlistRouter from "./waitlist-router";

const applicationRouter = require("express").Router();

applicationRouter.use(protect);

applicationRouter.route("/my-apps").get(getMyApplications);
applicationRouter.route("/").post(createApplication);
applicationRouter.route("/overview-stats/:id").get(appOverviewStats);

// Forward request to waitlist router
applicationRouter.use("/:id/app-waitlist", waitlistRouter);

applicationRouter
    .route("/:id")
    .get(getOneApplication)
    .patch(updateApplication)
    .delete(deleteApplication);

export default applicationRouter;
