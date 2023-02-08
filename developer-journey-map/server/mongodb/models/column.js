import mongoose from "mongoose";
import Touchpoint from "./touchpoint.js";

const Column = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    touchpoints: [Touchpoint]
});

const ColumnSchema = mongoose.model("Column", Column);

export default ColumnSchema;