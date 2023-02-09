import mongoose from "mongoose";

const connectDb = (connectionString) => {
    mongoose.set("strictQuery", true);
    mongoose.connect(connectionString)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((error) => {
            console.log(error);
        });
}

export default connectDb;