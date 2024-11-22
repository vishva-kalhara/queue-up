import { IUserDocument } from "./user-types";

export interface IApplicationDoc {
    _id: string;
    user: String | IUserDocument;
    title: string;
    appSecretKey: string;
    isListening: boolean;
    isActive: boolean;
}
