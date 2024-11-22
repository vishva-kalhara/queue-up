import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import user from "../schemas/user";
import AppError from "../utils/appError";

export const protect = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId: externalId } = getAuth(req);

    if (!externalId) return res.redirect("/sign-in");

    const loggedUser = await user.findOne({
        externalId,
        isActive: true,
    });

    if (!loggedUser) return res.redirect("/dashboard");
    if (!loggedUser?.isActive)
        return next(new AppError("User is banned!", 403));

    next();
};
