import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import ApplicationSchema from "../schemas/application";
import { randomBytes } from "crypto";
import { getAuth } from "@clerk/express";
import userSchema from "../schemas/user";
import { IApplicationDoc, IMyApp } from "../types/application-types";
import user from "../schemas/user";
import mongoose from "mongoose";
import application from "../schemas/application";
import waitlist from "../schemas/waitlist";
import { formatDistance, formatDistanceToNow } from "date-fns";
const ObjectId = mongoose.Types.ObjectId;

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
            .populate("user", "id")
            .select("isListening title")
            .sort({ createdAt: "desc" });

        const updatedApps: IMyApp[] = [];

        await Promise.all(
            apps.map(async (app) => {
                const appId: string = app.id;
                const [userCount, lastReq] = await Promise.all([
                    waitlist.aggregate([
                        {
                            $match: {
                                app: new ObjectId(appId),
                                isActive: true,
                            },
                        },
                        { $count: "number" },
                    ]),
                    waitlist.aggregate([
                        {
                            $match: {
                                app: new ObjectId(appId),
                            },
                        },
                        { $sort: { createdAt: -1 } },
                        { $project: { createdAt: 1 } },
                    ]),
                ]);

                updatedApps.push({
                    _id: app._id,
                    isListening: app.isListening,
                    userCount: userCount[0]?.number || 0, // Ensure optional chaining to avoid undefined errors
                    lastReq: lastReq.length
                        ? formatDistance(
                              new Date(lastReq[0].createdAt),
                              new Date(),
                              {
                                  addSuffix: true,
                              }
                          )
                        : "No requests found", // Handle case with no last request
                    isActive: app.isActive,
                    title: app.title,
                });
            })
        );

        res.status(200).json({
            success: "success",
            count: updatedApps.length,
            apps: updatedApps,
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

export const deleteApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const app = await application.findById(id);
        if (!app) return next(new AppError("App Not Found!", 404));

        await application.findByIdAndDelete(id);

        res.status(204).json({
            status: "success",
        });
    } catch (error) {
        console.error(error);
        return next(new AppError("Unhandled exception occured!", 500));
    }
};

export const appOverviewStats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const [appStatus, totalWaitlistUsers, chartData] = await Promise.all([
            application.aggregate([
                { $match: { _id: new ObjectId(id) } },
                {
                    $project: {
                        isListening: 1,
                    },
                },
            ]),
            waitlist.aggregate([
                {
                    $match: {
                        app: new ObjectId(id),
                        isActive: true,
                    },
                },
                { $count: "number" },
            ]),
            waitlist.aggregate([
                {
                    $addFields: {
                        date: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$createdAt",
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: "$date", // Group by the extracted date
                        value: { $sum: 1 }, // Count the number of documents
                    },
                },
                {
                    $sort: { _id: 1 }, // Sort by date (optional)
                },
            ]),
        ]);

        res.status(200).json({
            status: "success",
            isListening: appStatus[0].isListening,
            totalWaitlistUsers: totalWaitlistUsers[0]?.number || 0,
            chartData,
        });
    } catch (error) {
        console.error(error);
        next(new AppError("Unhandled Exception", 500));
    }
};
