import express from "express";
import morgan from "morgan";
import { clerkMiddleware, getAuth, requireAuth } from "@clerk/express";
import userRoutes from "./routes/user-routes";
import cors from "cors";
import bodyParser from "body-parser";
import AppError from "./utils/appError";
import errorMiddleware from "./middlewares/error-middleware";

export function createApp() {
    const app = express();

    const corsOptions = {
        origin: "http://localhost:5173", // Replace this with the exact origin of your frontend
        credentials: true, // Allow credentials (cookies, headers, etc.)
    };
    app.use(cors(corsOptions));
    app.options("*", cors());

    // if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    // console.log()
    // }

    app.use(express.json({ limit: "10kb" }));

    app.use(bodyParser());

    app.use(clerkMiddleware());
    // app.use(
    //     clerkMiddleware({
    //         authorizedParties: ["http://localhost:5173/"],
    //     })
    // );

    // app.get("/api/v1/test", requireAuth(), (req, res) => {
    //     const auth = getAuth(req);

    //     res.json(auth);
    // });

    app.use("/api/v1/users", userRoutes);

    app.all("*", (req, _res, next) => {
        next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
    });

    app.use(errorMiddleware);

    return app;
}
