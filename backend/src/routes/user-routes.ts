import { Router } from "express";
import {
    getMe,
    syncUserWithDB,
    updateMe,
} from "../controllers/user-controller";
import { requireAuth } from "@clerk/express";
import { protect } from "../middlewares/protect";

const userRoutes = Router();

userRoutes.get("/sync-user-with-db", syncUserWithDB);

userRoutes.use(protect);

userRoutes.get("/me", getMe);
userRoutes.patch("/update-me", updateMe);

export default userRoutes;
