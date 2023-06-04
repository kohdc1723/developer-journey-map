import mongoose from "mongoose";

const TouchpointSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
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

const Touchpoint = mongoose.model("Touchpoint", TouchpointSchema);
export default Touchpoint;
