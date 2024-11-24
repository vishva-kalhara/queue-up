import { Router } from "express";
import {
    addUserToWaitlist,
    getAppWaitlistData,
} from "../controllers/waitlist-controller";

const waitlistRouter = Router({ mergeParams: true });

waitlistRouter.route("/").post(addUserToWaitlist);
waitlistRouter.route("/").get(getAppWaitlistData);

export default waitlistRouter;
