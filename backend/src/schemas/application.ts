import mongoose, { Query } from "mongoose";
import { IApplicationDoc } from "../types/application-types";
import { IUserDocument } from "../types/user-types";

const ApplicationSchema = new mongoose.Schema<IApplicationDoc>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        appSecretKey: {
            type: String,
            required: [true, "Title is required"],
        },
        isListening: {
            type: Boolean,
            default: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "user is required"],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

export default mongoose.model<IApplicationDoc>(
    "Application",
    ApplicationSchema
);
