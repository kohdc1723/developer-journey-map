import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Map from "../mongodb/models/map.js";
dotenv.config();

const router = express.Router();

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