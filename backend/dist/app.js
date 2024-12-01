"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const express_2 = require("@clerk/express");
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const cors_1 = __importDefault(require("cors"));
const appError_1 = __importDefault(require("./utils/appError"));
const error_middleware_1 = __importDefault(require("./middlewares/error-middleware"));
const application_router_1 = __importDefault(require("./routes/application-router"));
const waitlist_router_1 = __importDefault(require("./routes/waitlist-router"));
function createApp() {
    const app = (0, express_1.default)();
    const corsOptions = {
        // origin: "http://localhost:5173", // Replace this with the exact origin of your frontend
        credentials: true, // Allow credentials (cookies, headers, etc.)
    };
    app.use((0, cors_1.default)(corsOptions));
    app.options("*", (0, cors_1.default)());
    // if (process.env.NODE_ENV === "development") {
    // app.use(morgan("dev"));
    // console.log()
    // }
    app.use(express_1.default.json({ limit: "10kb" }));
    // app.use(express.json());
    app.use((0, express_2.clerkMiddleware)());
    app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.status(200).send("API is up and running...");
    }));
    app.use("/api/v1/users", user_routes_1.default);
    // userRoutes.use(
    //     requireAuth({
    //         signInUrl: "/sign-in",
    //     })
    // );
    app.use("/api/v1/applications", application_router_1.default);
    app.use("/api/v1/waitlist", waitlist_router_1.default);
    app.all("*", (req, _res, next) => {
        next(new appError_1.default(`Can't find ${req.originalUrl} on the server!`, 404));
    });
    app.use(error_middleware_1.default);
    return app;
}
