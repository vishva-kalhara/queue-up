import { Router } from "express";
import {
    addUserToWaitlist,
    getAppWaitlistData,
} from "../controllers/waitlist-controller";

const waitlistRouter = Router({ mergeParams: true });

waitlistRouter.route("/")
    .get(getAppWaitlistData)
    .post(addUserToWaitlist);

export default waitlistRouter;
