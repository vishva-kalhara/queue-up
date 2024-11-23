import {
    createApplication,
    deleteApplication,
    getMyApplications,
    getOneApplication,
    updateApplication,
} from "../controllers/application-controller";
import { protect } from "../middlewares/protect";

const applicationRouter = require("express").Router();

applicationRouter.use(protect);

applicationRouter.route("/my-apps").get(getMyApplications);
applicationRouter.route("/").post(createApplication);

// applicationRouter.route("/:id/re-generate-secret").patch(regenerateAppSecret);

applicationRouter
    .route("/:id")
    .get(getOneApplication)
    .patch(updateApplication)
    .delete(deleteApplication);

export default applicationRouter;
