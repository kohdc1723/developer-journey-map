import express from "express";
import * as dotenv from "dotenv";
import Column from "../mongodb/models/column.js"
dotenv.config();

const router = express.Router();

// get all columns
router.route("/").get(async (req, res) => {
    try {
        const columns = await Column.find({});
        res.status(200).json({ success: true, data: columns });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

// create a touchpoint
router.route("/").post(async (req, res) => {
    
});

// update all columns
router.route("/").put(async (req, res) => {
    const columns = Object.values(req.body);
    
    const updateQueries = [];
    columns.forEach(column => {
        updateQueries.push({
            updateOne: {
                filter: { _id: column._id },
                update: { $set: { touchpoints: column.touchpoints } }
            }
        });
    });

    try {
        const result = await Column.bulkWrite(updateQueries);
        res.status(200).json({ success: true, result: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

export default router;