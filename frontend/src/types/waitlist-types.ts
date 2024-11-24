import { IApplicationDoc } from "./application-types";

export interface IWaitlistDoc {
    _id: string;
    app: IApplicationDoc | string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    isActive: boolean;
}
