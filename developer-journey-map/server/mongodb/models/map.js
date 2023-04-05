import mongoose from "mongoose";
import QuestionsColumn from "./questionsColumn.js";
import Column from "./column.js";
import { defaultColumn, defaultQuestionsColumn } from "./defaultMapContents.js";

const MapSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    lastModified: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    qstColumns: [QuestionsColumn.schema],
    columns: [Column.schema],
    froms: [String],
    tos: [String]
});

MapSchema.statics.createMap = function(uid) {
    const map = new this({
        _id: new mongoose.Types.ObjectId(),
        uid: uid,
        lastModified: new Date(),
        title: "Untitled",
        qstColumns: defaultQuestionsColumn,
        columns: defaultColumn
    });

    return map.save();
};

const Map = mongoose.model("Map", MapSchema);
export default Map;
