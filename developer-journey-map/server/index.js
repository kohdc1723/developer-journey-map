import express from "express";
import cors from "cors";
import connectDb from "./mongodb/connect.js";
import mapRoutes from "./routes/mapRoutes.js";
import mapsRoutes from "./routes/mapsRoutes.js";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/map", mapRoutes);
app.use("/api/maps", mapsRoutes);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

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