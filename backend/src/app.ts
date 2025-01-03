import express from "express";
import morgan from "morgan";
import {
    clerkClient,
    clerkMiddleware,
    getAuth,
    requireAuth,
} from "@clerk/express";
import userRoutes from "./routes/user-routes";
import cors from "cors";
import bodyParser from "body-parser";
import AppError from "./utils/appError";
import errorMiddleware from "./middlewares/error-middleware";
import applicationRouter from "./routes/application-router";
import waitlistRouter from "./routes/waitlist-router";

export function createApp() {
    const app = express();

    const corsOptions = {
        // origin: "http://localhost:5173", // Replace this with the exact origin of your frontend
        credentials: true, // Allow credentials (cookies, headers, etc.)
    };
    app.use(cors(corsOptions));
    app.options("*", cors());

    if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));
        // console.log()
    }

    app.use(express.json({ limit: "10kb" }));

    // app.use(express.json());

    app.use(clerkMiddleware());

    app.get("/", async (req, res) => {
        res.status(200).json({ message: "API is up and running..." });
    });

    app.use("/api/v1/users", userRoutes);

    // userRoutes.use(
    //     requireAuth({
    //         signInUrl: "/sign-in",
    //     })
    // );

    app.use("/api/v1/applications", applicationRouter);

    app.use("/api/v1/waitlist", waitlistRouter);

    app.all("*", (req, _res, next) => {
        next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
    });

    app.use(errorMiddleware);

    return app;
}
