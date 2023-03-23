import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { Map } from "../mongodb/models/map.js"
dotenv.config();

const router = express.Router();

// create a duplicate map by _id
router.route("/:id").post(async (req, res) => {
    const id = req.params.id;
    const uid = req.body.uid;
    const lastModified = req.body.lastModified;

    const mapToDuplicate = await Map.findById(id);
    if (!mapToDuplicate) {
        return res.status(404).json({ success: false, message: "map not found" });
    }

    const duplicateMap = new Map({
        _id: new mongoose.Types.ObjectId(),
        uid: uid,
        lastModified: lastModified,
        title: mapToDuplicate.title,
        qstColumns: mapToDuplicate.qstColumns,
        columns: mapToDuplicate.columns
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