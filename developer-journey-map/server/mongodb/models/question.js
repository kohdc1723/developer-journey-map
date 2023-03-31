import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
        required: true
    },
    question: {
        type: String,
        required: true
    }
});

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
