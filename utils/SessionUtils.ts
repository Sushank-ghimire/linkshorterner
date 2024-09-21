import { SessionData } from "@/Types/SessionData.types";
import { SessionOptions } from "iron-session";

export const defaultSession: SessionData = {
    isLoggedIn: false
};

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: "user-sessions",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    },
    ttl: 60 * 60 * 24 * 3,
};