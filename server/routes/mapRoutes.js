import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import Map from "../mongodb/models/map.js";
import Question from "../mongodb/models/question.js";
import Column from "../mongodb/models/column.js";
import Touchpoint from "../mongodb/models/touchpoint.js";
import QuestionsColumn from "../mongodb/models/questionsColumn.js"
dotenv.config();

const router = express.Router();

// get a map by _id (map's _id)
router.route("/:id").get(async (req, res) => {
    const id = req.params.id;

    try {
        const map = await Map.findById(id);
        res.status(200).json({ success: true, data: map });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});

// create a map
router.route("/:uid").post(async (req, res) => {
    const uid = req.params.uid;
    
    try {
        const result = await Map.createMap(uid);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});

// create a duplicate map by _id
router.route("/duplicate/:id").post(async (req, res) => {
    const id = req.params.id;
    const uid = req.body.uid;
    const lastModified = req.body.lastModified;

    // get a map to duplicate
    const mapToDuplicate = await Map.findById(id);
    if (!mapToDuplicate) {
        return res.status(404).json({ success: false, message: "map not found" });
    }

    // set fields of the map
    const copyPrefix = "Copy of ";
    const duplicateMap = new Map({
        _id: new mongoose.Types.ObjectId(),
        uid: uid,
        lastModified: lastModified,
        title: copyPrefix.concat(mapToDuplicate.title),
        qstColumns: [],
        columns: [],
        froms: [],
        tos: []
    });

    mapToDuplicate.qstColumns.forEach(qstColumn => {
        const newQuestions = [];
        qstColumn.questions.forEach(question => {
            newQuestions.push(new Question({
                ...question.toObject(),
                _id: new mongoose.Types.ObjectId()
            }));
        });

        duplicateMap.qstColumns.push(new QuestionsColumn({
            ...qstColumn.toObject(),
            questions: newQuestions,
            _id: new mongoose.Types.ObjectId()
        }));
    });

    mapToDuplicate.columns.forEach(column => {
        const newTouchpoints = [];
        column.touchpoints.forEach(touchpoint => {
            newTouchpoints.push(new Touchpoint({
                ...touchpoint.toObject(),
                _id: new mongoose.Types.ObjectId()
            }));
        });

        duplicateMap.columns.push(new Column({
            ...column.toObject(),
            touchpoints: newTouchpoints,
            _id: new mongoose.Types.ObjectId()
        }));
    });

    mapToDuplicate.froms.forEach(fromId => {
        const touchpoint = mapToDuplicate.columns
            .flatMap(column => column.touchpoints)
            .find(touchpoint => touchpoint._id.equals(fromId));

        if (touchpoint) {
            const matchingTouchpoint = duplicateMap.columns
                .find(column => column.touchpoints.some(tp => tp.title === touchpoint.title))
                .touchpoints.find(tp => tp.title === touchpoint.title);
    
            const matchingTouchpointId = matchingTouchpoint._id;
            duplicateMap.froms.push(matchingTouchpointId);
        }
    });

    mapToDuplicate.tos.forEach(toId => {
        const touchpoint = mapToDuplicate.columns
            .flatMap(column => column.touchpoints)
            .find(touchpoint => touchpoint._id.equals(toId));

        if (touchpoint) {
            const matchingTouchpoint = duplicateMap.columns
                .find(column => column.touchpoints.some(tp => tp.title === touchpoint.title))
                .touchpoints.find(tp => tp.title === touchpoint.title);
    
            const matchingTouchpointId = matchingTouchpoint._id;
            duplicateMap.tos.push(matchingTouchpointId);
        }
    });

    try {
        const result = await duplicateMap.save();
        res.status(200).json({ success: true, result: result });
    } catch (err) {
        res.status(500).json({ success: false, message: err });
    }
});

// delete a map by _id
router.route("/:id").delete(async (req, res) => {
    const id = req.params.id;

    try {
        const map = await Map.findOneAndRemove({ _id: id });
        if (!map) {
            return res.status(404).json({ success: false, message: "map not found" });
        }

        res.status(200).json({ success: true, result: map });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});

// update a map's lastModified
router.route("/timestamp/:id").put(async (req, res) => {
    const id = req.params.id;
    const timestamp = req.body.timestamp;

    try {
        const result = await Map.updateOne({ _id: id }, { lastModified: new Date(timestamp) });
        res.status(200).json({ success: true, result: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});

// update a map's title
router.route("/title/:id").put(async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;

    try {
        const result = await Map.updateOne({ _id: id }, { title: title });
        res.status(200).json({ success: true, result: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});

// update columns in a map which _id == id
router.route("/column/:id").put(async (req, res) => {
    const id = req.params.id;
    const columns = Object.values(req.body);

    const map = await Map.findOne({ _id: id });
    if (!map) {
        return res.status(404).json({ success: false, message: "map not found" });
    }

    const updateQueries = [];
    columns.forEach(column => {
        updateQueries.push({
            updateOne: {
                filter: { "_id": id, "columns.colIndex": column.colIndex },
                update: { $set: { "columns.$.touchpoints": column.touchpoints } }
            }
        });
    });

    try {
        const result = await Map.bulkWrite(updateQueries);
        res.status(200).json({ success: true, result: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

// creates new touchpoint by pushing a touchpoint object into map_id's column_id's touchpoint array
// auto generates touchpoint_id so it doesn't need to be included in the body
router.route("/newtouchpoint/:id").put(async (req, res) => {
    const id = req.params.id;
    const touchpoint = req.body;

    const map = await Map.updateOne(
        { _id: id },
        {
            $push:
            {
                "columns.$[column].touchpoints": {
                    "_id": new mongoose.Types.ObjectId(),
                    "title": touchpoint.title,
                    "borderColor": touchpoint.borderColor,
                    "borderSize": touchpoint.borderSize,
                    "text": touchpoint.text
                }
            }
        },
    {
        arrayFilters: [
            { "column._id": touchpoint.columnId }]
    });
res.send(map)
});


// update touchpoint in a map with map _id == id
router.route("/touchpoint/:id").put(async (req, res) => {
    const id = req.params.id;
    const touchpoint = req.body;

    const map = await Map.updateOne({ _id: id },
        {
            $set: {
                "columns.$[].touchpoints.$[touchpoint].title": touchpoint.title,
                "columns.$[].touchpoints.$[touchpoint].borderColor": touchpoint.borderColor,
                "columns.$[].touchpoints.$[touchpoint].borderSize": touchpoint.borderSize,
                "columns.$[].touchpoints.$[touchpoint].text": touchpoint.text,
            }
        },
        { arrayFilters: [{ "touchpoint._id": touchpoint._id }] });
    res.send(map)
});

// remove touchpoint in a map with map _id == id
router.route("/deletetouchpoint/:id").put(async (req, res) => {
    const id = req.params.id;
    const touchpoint = req.body;

    const map = await Map.updateOne({ _id: id },
        { $pull: { "columns.$[].touchpoints": { _id: touchpoint._id } } },
        { multi: false });
    res.send(map)
});

router.route("/arrow/:id").put(async (req, res) => {
    const id = req.params.id;
    const arrows = req.body.arrows;
    try {
        const result = await Map.updateOne({ _id: id },
            { froms: arrows.map(arrow => arrow.source), tos: arrows.map(arrow => arrow.target) }
        );
        res.status(200).json({ success: true, result: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});

export default router;