import { Router } from "express";
import {
    createUser,
    getMe,
    syncUserWithDB,
} from "../controllers/user-controller";
import { requireAuth } from "@clerk/express";
import {
    ClerkExpressRequireAuth,
    ClerkExpressWithAuth,
} from "@clerk/clerk-sdk-node";

const userRoutes = Router();

userRoutes.post("/", createUser);

userRoutes.use(requireAuth());

userRoutes.get("/me", getMe);
userRoutes.get("/sync-user-with-db", syncUserWithDB);

export default userRoutes;
