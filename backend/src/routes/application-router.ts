import {
    createApplication,
    deleteApplication,
    getAllApplications,
    getOneApplication,
    updateApplication,
} from "../controllers/application-controller";
import { protect } from "../middlewares/protect";

const applicationRouter = require("express").Router();

applicationRouter.use(protect);

applicationRouter.route("/").get(getAllApplications).post(createApplication);

applicationRouter
    .route("/:id")
    .get(getOneApplication)
    .patch(updateApplication)
    .delete(deleteApplication);

export default applicationRouter;
