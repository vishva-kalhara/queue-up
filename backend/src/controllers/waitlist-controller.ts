import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import user from "../schemas/user";
import application from "../schemas/application";
import waitlist from "../schemas/waitlist";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const addUserToWaitlist = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Checks whether the request body is invalid
        if (!req.body.appSecretKey || !req.body.data.email)
            return next(new AppError("Invalid request body!", 400));

        const { appSecretKey, data } = req.body;

        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith("Bearer")
        )
            return next(new AppError("Authorization header is required!", 401));

        const currUser = await user
            .findOne()
            .where("apiKey", req.headers.authorization.split(" ")[1])
            .select("id");
        if (!currUser) return next(new AppError("Invalid User API Key!", 404));

        const app = await application
            .findOne()
            .where("appSecretKey", appSecretKey)
            .where("user", currUser.id)
            .populate("user", "_id")
            .select("_id title");
        if (!app)
            return next(
                new AppError(`Invalid 'appSecretKey' or app not found!`, 404)
            );

        const hasUserInWaitlist = await waitlist.findOne({
            app: app._id,
            email: data.email,
        });
        if (hasUserInWaitlist)
            return next(
                new AppError(`You are already registered on the waitlist!`, 400)
            );

        const filteredObj = {
            email: undefined,
            firstName: undefined,
            lastName: undefined,
        };

        if (data.email) filteredObj.email = data.email;
        if (data.firstName) filteredObj.firstName = data.firstName;
        if (data.lastName) filteredObj.lastName = data.lastName;

        const addedUser = await waitlist.create({
            app: app._id,
            email: filteredObj.email,
            firstName: filteredObj.firstName,
            lastName: filteredObj.lastName,
        });

        const record = {
            app: app.title,
            email: addedUser.email,
            firstName: addedUser.firstName,
            lastName: addedUser.lastName,
            createdAt: addedUser.createdAt,
            isActive: addedUser.isActive,
        };

        res.status(201).json({
            status: "success",
            record,
        });
    } catch (error) {
        console.error(error);
        next(new AppError("Unhandled Exception", 500));
    }
};

export const getAppWaitlistData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const appId = req.params.id;
        if (!appId) return res.redirect("/dashboard");

        console.log(req.query);

        const limit = req.query.limit ? Number(req.query.limit) : 25;
        const page = req.query.page ? Number(req.query.page) : 1;
        const sort = req.query.sort
            ? (req.query.sort as "asc" | "desc")
            : "desc";

        const [data, totalCount] = await Promise.all([
            waitlist
                .find()
                .where("app", appId)
                .limit(limit)
                .skip(limit * page)
                .populate("app", "_id")
                .sort({ createdAt: sort }),
            waitlist.aggregate([
                { $match: { app: new ObjectId(appId) } },
                { $count: "number" },
            ]),
        ]);

        res.status(200).json({
            status: "success",
            count: data.length,
            totalCount: totalCount[0].number,
            data,
        });
    } catch (error) {
        console.error(error);
        next(new AppError("Unhandled Exception", 500));
    }
};
