import { IUserDocument } from "./user-types";
import mongoose from "mongoose";

export interface IApplicationDoc extends mongoose.Document {
    _id: string;
    user: String | IUserDocument | mongoose.Schema.Types.ObjectId;
    title: string;
    appSecretKey: string;
    isListening: boolean;
    isActive: boolean;
}
