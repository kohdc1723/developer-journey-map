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

// update columns of the map
router.route("column").put(async (req, res) => {
    const id = req.params.id;
    const columns = Object.values(req.body.columns);
    const updateQueries = [];

    // columns.forEach(column => {
    //     updateQueries.push({
    //         updateOne: {
    //             filter: { _id: id },
    //             update: { $set: { columns: columns } }
    //         }
    //     });
    // });

    try {
        const result = await Map.updateOne({ _id: id }, { $set: { columns: columns } });
        // const result = await Map.bulkWrite(updateQueries);
        res.status(200).json({ success: true, result: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

export default router;