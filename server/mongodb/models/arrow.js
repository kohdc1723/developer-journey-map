import mongoose from "mongoose";

const ArrowSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }
});

const Arrow = mongoose.model("Arrow", ArrowSchema);
export default Arrow;
