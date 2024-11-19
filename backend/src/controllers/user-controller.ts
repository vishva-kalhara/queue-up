import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import userSchema from "../schemas/user";
import { randomBytes } from "crypto";
import { clerkClient, ExpressRequestWithAuth, getAuth } from "@clerk/express";

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { externalId, email } = req.body;

        if (!externalId)
            return next(new AppError("External Id is required!", 400));
        if (!email) return next(new AppError("Email is required!", 400));

        const apiKey = randomBytes(16 / 2).toString("hex");

        const newUser = await userSchema.create({
            email,
            externalId,
            apiKey,
            isActive: true,
        });

        res.status(201).json({
            success: true,
            user: newUser,
        });
    } catch (e) {
        console.error(e);
        next(new AppError(e as string, 500));
    }
};

export const syncUserWithDB = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId: externalId } = getAuth(req);

    let loggedUser = await userSchema.findOne({ externalId });

    if (!loggedUser) {
        const apiKey = randomBytes(16 / 2).toString("hex");

        const user = await clerkClient.users.getUser(externalId!);

        loggedUser = await userSchema.create({
            email: user.emailAddresses[0].emailAddress,
            externalId,
            apiKey,
            isActive: true,
        });
    }

    res.status(200).json({
        isSynced: loggedUser ? true : false,
    });
};

export const getMe = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId: externalId } = getAuth(req);

    const loggedUser = await userSchema.findOne({ externalId });

    res.json({ success: loggedUser ? true : false, user: loggedUser });
};
