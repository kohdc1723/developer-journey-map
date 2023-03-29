import mongoose from "mongoose";

const Touchpoint = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId(),
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
    position: {
        type: String,
        required: true
    },
    touchpoints: [Touchpoint]
});

const Question = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId(),
        required: true
    },
    qstIndex: {
        type: Number,
        default: 0,
        required: true
    },
    question: {
        type: String,
        required: true
    }
});

const QuestionsColumn = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId(),
        required: true
    },
    qstColIndex: {
        type: Number,
        required: true
    },
    questions: {
        type: [Question]
    },
    qstCounter: {
        type: Number,
        default: 0,
        required: true
    }
});

Question.pre("save", function(next) {
    if (this.isNew) {
        this.qstIndex = this.parent().qstCounter++;
    }

    next();
});

const Arrow = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId(),
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
    qstColumns: [QuestionsColumn],
    columns: [Column],
    froms: [String],
    tos: [String],
});

const MapSchema = mongoose.model("Map", Map);

export default MapSchema;