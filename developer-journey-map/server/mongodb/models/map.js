import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const Touchpoint = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId(),
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Column = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId(),
        required: true
    },
    colIndex: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    touchpoints: [Touchpoint]
});

// const Questions = new mongoose.Schema({
//     qIndex: {
//         type: Number,
//         required: true
//     },
//     questions: {
//         type: [Question]
//     }
// })

// const Question = new mongoose.Schema({
    
// })

const Map = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId(),
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
    columns: [Column]
});

const MapSchema = mongoose.model("Map", Map);

export default MapSchema;