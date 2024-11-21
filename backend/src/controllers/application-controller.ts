import {Request, Response, NextFunction} from 'express'
import AppError from "../utils/appError";
import ApplicationSchema from "../schemas/application";
import {randomBytes} from "crypto";
import {getAuth} from "@clerk/express";
import userSchema from "../schemas/user";

export const getAllApplications =
    async (req: Request, res: Response, next: NextFunction) => {


        res.status(200).json({
            success: 'fail',
            message: '(GET) / endpoint is under construction.'
        })
    }

export const getOneApplication = (req: Request, res: Response, next: NextFunction) => {

    res.status(200).json({
        success: 'fail',
        message: '(GET) /:id endpoint is under construction.'
    })
}

export const createApplication =

    async (req: Request, res: Response, next: NextFunction) => {

        if (!req.body.title)
            return next(new AppError('Title is requered!', 400));

        const appSecretKey = randomBytes(16 / 2).toString("hex");

        const {userId: externalId} = getAuth(req);

        let loggedUser = await userSchema.findOne({externalId});

        const application = await ApplicationSchema.create({
            title: req.body.title,
            appSecretKey,
            user: loggedUser!._id
        })

        res.status(201).json({
            success: 'success',
            application,
        })
    }

export const updateApplication = (req: Request, res: Response, next: NextFunction) => {

    res.status(200).json({
        success: 'fail',
        message: '(PATCH) /:id endpoint is under construction.'
    })
}

export const deleteApplication = (req: Request, res: Response, next: NextFunction) => {

    res.status(200).json({
        success: 'fail',
        message: '(DELETE) /:id endpoint is under construction.'
    })
}
