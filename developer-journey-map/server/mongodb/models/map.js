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
    index: {
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

const Map = new mongoose.Schema({
    uid: {
        type: String,
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