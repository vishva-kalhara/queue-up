import mongoose from "mongoose";
import { IUserDocument } from "../types/user-types";

const User = new mongoose.Schema<IUserDocument>({
    createdAt: {
        type: Date,
        default: new Date(),
    },
    externalId: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
    },
    apiKey: {
        type: String,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model<IUserDocument>("User", User);
