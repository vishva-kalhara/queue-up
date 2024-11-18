import express from "express";
import { clerkMiddleware } from "@clerk/express";

export function createApp() {
    const app = express();

    app.use(clerkMiddleware());

    return app;
}
