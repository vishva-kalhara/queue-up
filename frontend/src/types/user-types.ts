export type IUserDocument = {
    _id: string;
    createdAt: Date;
    email: string;
    apiKey: string;
    isActive: boolean;
    externalId: string;
};
