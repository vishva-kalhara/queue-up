import * as express from "express";
import { IUserDocument } from "./userTypes";

declare global {
    namespace Express {
        interface Request {
            user?: IUserDocument;
        }
    }
}
