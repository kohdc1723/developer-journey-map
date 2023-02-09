import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const Touchpoint = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid(),
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

export default Touchpoint;