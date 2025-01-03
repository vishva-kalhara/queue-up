import { Router } from "express";
import {
    addUserToWaitlist,
    getAppWaitlistData,
} from "../controllers/waitlist-controller";
import { protect } from "../middlewares/protect";

const waitlistRouter = Router({ mergeParams: true });

waitlistRouter.route("/").post(addUserToWaitlist);

// waitlistRouter.use(protect);

waitlistRouter.route("/").get(getAppWaitlistData);

export default waitlistRouter;
