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

const Column = new mongoose.Schema({
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

const Questions = new mongoose.Schema({
    qIndex: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    items: {
        type: [String]
    }
})

const Question = new mongoose.Schema({
    
})

const Map = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    lastModified: {
        type: Date,
        required: true
    },
    columns: [Column]
});

const MapSchema = mongoose.model("Map", Map);

export default MapSchema;