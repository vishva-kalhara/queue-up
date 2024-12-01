"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", ".env") });
const app_1 = require("./app");
// import mongoose from 'mongoose';
const db_1 = __importDefault(require("./db"));
const app = (0, app_1.createApp)();
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception! Server is shutting down...");
    console.log(err.name, err.message);
    // console.log(err)
    process.exit(1);
});
const PORT = process.env.PORT || 3001;
(0, db_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
});
