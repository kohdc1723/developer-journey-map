import mongoose from "mongoose";
import Touchpoint from "./touchpoint.js";

const ColumnSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
        required: true
    },
    colIndex: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    touchpoints: [Touchpoint.schema]
});

const Column = mongoose.model("Column", ColumnSchema);
export default Column;
