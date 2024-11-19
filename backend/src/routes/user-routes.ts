import { Router } from "express";
import {
    createUser,
    getMe,
    syncUserWithDB,
} from "../controllers/user-controller";
import { requireAuth } from "@clerk/express";

const userRoutes = Router();

userRoutes.post("/", createUser);

userRoutes.use(
    requireAuth({
        signInUrl: "/sign-in",
    })
);

userRoutes.get("/me", getMe);
userRoutes.get("/sync-user-with-db", syncUserWithDB);

export default userRoutes;
