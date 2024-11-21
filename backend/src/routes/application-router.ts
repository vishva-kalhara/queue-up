import {
    createApplication, deleteApplication,
    getAllApplications,
    getOneApplication,
    updateApplication
} from "../controllers/application-controller";

const applicationRouter = require("express").Router();

applicationRouter.route('/')
    .get(getAllApplications)
    .post(createApplication)

applicationRouter.route('/:id')
    .get(getOneApplication)
    .patch(updateApplication)
    .delete(deleteApplication)

export default applicationRouter;