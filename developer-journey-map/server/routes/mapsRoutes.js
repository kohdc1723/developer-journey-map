import express from "express";
import * as dotenv from "dotenv";
import Map from "../mongodb/models/map.js"
dotenv.config();

const router = express.Router();

// get maps by uid (user's _id)
router.route("/:uid").get(async (req, res) => {
    const uid = req.params.uid;

    try {
        const maps = await Map.find({ uid });
        res.status(200).json({ success: true, data: maps });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});

export default router;