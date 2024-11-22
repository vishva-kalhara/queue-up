import * as express from "express";
import { IUserDocument } from "./userTypes";

declare global {
    namespace Express {
        interface Request {
            user?: { id: string; role: string }; // Adjust the structure based on your needs
        }
    }
}
