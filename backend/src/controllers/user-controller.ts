import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import userSchema from "../schemas/user";
import { randomBytes } from "crypto";
import { clerkClient, ExpressRequestWithAuth, getAuth } from "@clerk/express";

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
    // if (!loggedUser) return res.redirect("/sign-in");

    res.status(200).json({ status: "success", user: loggedUser });
};

export const updateMe = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId: externalId } = getAuth(req);

    const loggedUser = await userSchema.findOne({ externalId });

    const newUser = await userSchema.findByIdAndUpdate(
        loggedUser?._id,
        {
            apiKey: req.body.apiKey,
        },
        {
            new: true,
        }
    );

    console.log();

    res.status(200).json({ status: "success", user: newUser });
};
