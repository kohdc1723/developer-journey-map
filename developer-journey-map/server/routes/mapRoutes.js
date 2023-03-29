import express from "express";
import * as dotenv from "dotenv";
import Map from "../mongodb/models/map.js"
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