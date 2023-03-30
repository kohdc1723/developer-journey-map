import express from "express";
import cors from "cors";
import connectDb from "./mongodb/connect.js";
import mapsRoutes from "./routes/mapsRoutes.js";
import mapRoutes from "./routes/mapRoutes.js";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import "./passport.js";
import passport from "passport";
import authRoutes from "./routes/auth.js";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", methods: "GET,POST,PUT,DELETE", credentials: true }));
app.use(cookieParser());
app.use(cookieSession({ name: "session", keys: ["journeymap"], maxAge: 24 * 60 * 60 * 1000 }));  // 24 hours
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/map", mapRoutes);
app.use("/api/maps", mapsRoutes);
app.use("/auth", authRoutes);

const connectServer = (port) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

const startServer = async (port) => {
    try {
        connectDb(process.env.MONGO_CONNECTION_STRING);
        connectServer(process.env.PORT);
    } catch (error) {
        console.log(error);
    }
}

// starts server here
startServer();