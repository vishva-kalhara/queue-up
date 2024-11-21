import mongoose from "mongoose";

export interface IUserDocument  extends mongoose.Document {
    _id: string;
    createdAt: Date;
    email: string;
    apiKey: string;
    isActive: boolean;
    externalId: string;
};
