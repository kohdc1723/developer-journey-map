import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { Map, Question } from "../mongodb/models/map.js";
dotenv.config();

const router = express.Router();

// update question by _id
router.route("/:id").put(async (req, res) => {
    const questionId = req.params.id;

    const mapId = req.body.mapId;
    const questionColumnId = req.body.questionColumnId;
    const questionContent = req.body.questionContent;

    try {
        // find map by mapId
        const map = await Map.findById(mapId);
        if (!map) {
            return res.status(404).json({ success: false, message: "Map not found" });
        }

        // find questionColumn by questionColumnId
        const questionColumn = await map.qstColumns.find((column) => column._id.toString() === questionColumnId);
        if (!questionColumn) {
            return res.status(404).json({ success: false, message: "Question column not found" });
        }

        // find question by questionId and update
        const question = await questionColumn.questions.find((question) => question._id.toString() === questionId);
        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        if (questionContent === "") {
            questionColumn.questions = questionColumn.questions.filter(q => q._id.toString() !== questionId);
        }

        question.question = questionContent;
        const result = await map.save();

        res.status(200).json({ success: true, result: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});

// create question by questionColumnId
router.route("/:questionColumnId").post(async (req, res) => {
    const questionColumnId = req.params.questionColumnId;
    const mapId = req.body.mapId;
    const questionContent = req.body.questionContent;

    try {
        // find map by mapId
        const map = await Map.findById(mapId);
        if (!map) {
            return res.status(404).json({ success: false, message: "Map not found" });
        }

        // find questionColumn by questionColumnId
        const questionColumn = await map.qstColumns.find((column) => column._id.toString() === questionColumnId);
        if (!questionColumn) {
            return res.status(404).json({ success: false, message: "Question column not found" });
        }

        // add new question to questionColumn
        const newQuestion = new Question({
            _id: new mongoose.Types.ObjectId(),
            question: questionContent,
            qstIndex: questionColumn.qstCounter
        });
        questionColumn.questions.push(newQuestion);

        const result = await map.save();

        res.status(200).json({ success: true, result: newQuestion });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});

export default router;