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
    },
    borderColor: {
        type: String,
    },
    borderSize: {
        type: String,
    },
    text: {
        type: String,
    }
});

export default Touchpoint;