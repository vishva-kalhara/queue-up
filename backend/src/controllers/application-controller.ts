import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import ApplicationSchema from "../schemas/application";
import { randomBytes } from "crypto";
import { getAuth } from "@clerk/express";
import userSchema from "../schemas/user";
import { IApplicationDoc } from "../types/application-types";
import user from "../schemas/user";
import mongoose from "mongoose";

export const getMyApplications = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = getAuth(req);

        const logged = await user.findOne({
            externalId: userId,
        });

        const apps = await ApplicationSchema.find()
            .where("user")
            .equals(logged?.id)
            .populate("user", "id");

        res.status(200).json({
            success: "success",
            count: apps.length,
            apps,
        });
    } catch (error) {
        console.log(error);
        return next(new AppError("Unhandled exception occured!", 500));
    }
};

export const getOneApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = getAuth(req);
        const loggedUser = await user.findOne({
            externalId: userId,
        });
        const { id } = req.params;

        // console.log(loggedUser);

        const app = await ApplicationSchema.findOne()
            .where("user", loggedUser?.id)
            .where("_id", id)
            .populate("user", "_id");

        if (!app) return res.redirect("/not-found");

        return res.status(200).json({
            status: "success",
            app,
        });
    } catch (error) {
        console.error(error);
        return next(new AppError("Unhandled exception occured!", 500));
    }
};

export const createApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId: externalId } = getAuth(req);

        console.log(externalId);

        if (!req.body.title)
            return next(new AppError("Title is required!", 400));

        const logged = await user.findOne({
            externalId,
        });

        // Check whether there is already an app with the same title
        const hasApp = await ApplicationSchema.findOne()
            .where("user", logged?.id)
            .where("title", req.body.title)
            .populate("user", "id");

        if (hasApp)
            return next(
                new AppError(
                    "There is already an application with the same title!",
                    400
                )
            );

        // Generate app Secret
        const appSecretKey = randomBytes(16 / 2).toString("hex");

        let loggedUser = await userSchema.findOne({ externalId });

        const application = await ApplicationSchema.create({
            title: req.body.title,
            appSecretKey,
            user: loggedUser!._id,
        });

        res.status(201).json({
            success: "success",
            application,
        });
    } catch (error) {
        return next(new AppError("Unhandled exception occured!", 500));
    }
};

export const updateApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updatedApp = await ApplicationSchema.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            req.body,
            {
                new: true,
            }
        );

        res.status(200).json({
            success: "success",
            app: updatedApp,
        });
    } catch (error) {
        console.error(error);
        return next(new AppError("Unhandled exception occured!", 500));
    }
};

export const deleteApplication = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(200).json({
        success: "fail",
        message: "(DELETE) /:id endpoint is under construction.",
    });
};
