import { IUserDocument } from "./user-types";

export interface IApplicationDoc {
    _id: string;
    user: string | IUserDocument;
    title: string;
    appSecretKey: string;
    isListening: boolean;
    isActive: boolean;
}

export interface IMyApp {
    userCount: number;
    _id: string;
    title: string;
    isListening: boolean;
    isActive: boolean;
    lastReq: string;
}
