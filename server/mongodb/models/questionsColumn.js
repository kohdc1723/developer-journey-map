import mongoose from "mongoose";
import Question from "./question.js";

const QuestionsColumnSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
        required: true
    },
    qstColIndex: {
        type: Number,
        required: true
    },
    questions: {
        type: [Question.schema]
    }
});

const QuestionsColumn = mongoose.model("QuestionsColumn", QuestionsColumnSchema);
export default QuestionsColumn;
