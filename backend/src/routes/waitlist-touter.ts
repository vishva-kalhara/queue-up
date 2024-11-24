import { Router } from "express";
import { addUserToWaitlist } from "../controllers/waitlist-controller";

const waitlistRouter = Router();

waitlistRouter.post("/", addUserToWaitlist);

export default waitlistRouter;
