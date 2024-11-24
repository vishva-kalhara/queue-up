import mongoose from "mongoose";
import { IApplicationDoc } from "./application-types";

export interface IWaitlistDoc extends mongoose.Document {
    _id: string;
    app: IApplicationDoc | string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    isActive: boolean;
}
