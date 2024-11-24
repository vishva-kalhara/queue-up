import mongoose, { Schema } from "mongoose";
import { IWaitlistDoc } from "../types/waitlist-types";

const waitlistSchema = new Schema<IWaitlistDoc>(
    {
        app: {
            type: mongoose.Schema.ObjectId,
            ref: "Application",
            required: [true, "App id is required!"],
        },
        createdAt: {
            type: Date,
            default: new Date(),
        },
        email: {
            type: String,
            required: [true, "Email is required!"],
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

export default mongoose.model<IWaitlistDoc>("Waitlist", waitlistSchema);
