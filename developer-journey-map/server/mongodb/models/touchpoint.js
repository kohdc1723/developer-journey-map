import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const Touchpoint = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuid(),
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

export default Touchpoint;