import express from "express";
import cors from "cors";
import connectDb from "./mongodb/connect.js";
import columnRoutes from "./routes/columnRoutes.js";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/column", columnRoutes);

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