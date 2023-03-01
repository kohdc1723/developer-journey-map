import { MongoClient } from "mongodb";
import { v4 as uuid } from "uuid";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const defaultColumn = [
    {
        _id: mongoose.Types.ObjectId(),
        colIndex: "0",
        position: "internal",
        touchpoints: [
            {
                _id: mongoose.Types.ObjectId(),
                content: "Dev Hub Landing Page"
            },
            {
                _id: mongoose.Types.ObjectId(),
                content: "Newsletter"
            }
        ]
    },
    {
        _id: mongoose.Types.ObjectId(),
        colIndex: "1",
        position: "internal",
        touchpoints: [
            {
                _id: mongoose.Types.ObjectId(),
                content: "Docs Landing Page"
            },
            {
                _id: mongoose.Types.ObjectId(),
                content: "FAQs"
            }
        ]
    },
    {
        _id: mongoose.Types.ObjectId(),
        colIndex: "2",
        position: "internal",
        touchpoints: [
            {
                _id: mongoose.Types.ObjectId(),
                content: "Code Samples"
            },
            {
                _id: mongoose.Types.ObjectId(),
                content: "Tutorials"
            }
        ]
    },
    {
        _id: mongoose.Types.ObjectId(),
        colIndex: "3",
        position: "internal",
        touchpoints: [
            {
                _id: mongoose.Types.ObjectId(),
                content: "Change Log"
            },
            {
                _id: mongoose.Types.ObjectId(),
                "content": "Sandbox"
            }
        ]
    },
    {
        _id: mongoose.Types.ObjectId(),
        colIndex: "4",
        position: "internal",
        touchpoints: [
            {
                _id: mongoose.Types.ObjectId(),
                content: "Showcase"
            },
            {
                _id: mongoose.Types.ObjectId(),
                content: "Certitication"
            }
        ]
    },
    {
        _id: mongoose.Types.ObjectId(),
        colIndex: "5",
        position: "external",
        touchpoints: [
            {
                _id: mongoose.Types.ObjectId(),
                content: "Syndication"
            },
            {
                _id: mongoose.Types.ObjectId(),
                content: "Referrals"
            }
        ]
    },
    {
        _id: mongoose.Types.ObjectId(),
        colIndex: "6",
        position: "external",
        touchpoints: [
            {
                _id: mongoose.Types.ObjectId(),
                content: "GitHub"
            },
            {
                _id: mongoose.Types.ObjectId(),
                content: "Stack Overflow"
            }
        ]
    },
    {
        _id: mongoose.Types.ObjectId(),
        colIndex: "7",
        position: "external",
        touchpoints: [
            {
                _id: mongoose.Types.ObjectId(),
                content: "Technology Dependencies"
            }
        ]
    },
    {
        _id: mongoose.Types.ObjectId(),
        colIndex: "8",
        position: "external",
        touchpoints: []
    },
    {
        _id: mongoose.Types.ObjectId(),
        colIndex: "9",
        position: "external",
        touchpoints: []
    }
];

const testdb = [
    {
        _id: mongoose.Types.ObjectId(),
        uid: "1",
        lastModified: new Date(),
        title: "Map1",
        columns: defaultColumn
    },
    {
        _id: mongoose.Types.ObjectId(),
        uid: "2",
        lastModified: new Date(),
        title: "Map2",
        columns: defaultColumn
    },
    {
        _id: mongoose.Types.ObjectId(),
        uid: "2",
        lastModified: new Date(),
        title: "Map22",
        columns: defaultColumn
    },
    {
        _id: mongoose.Types.ObjectId(),
        uid: "3",
        lastModified: new Date(),
        title: "Map3",
        columns: defaultColumn
    },
];

const uri = "mongodb+srv://team13:team13@developer-journey-map.xx3xnsr.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const db = client.db("test3");
    const collection = db.collection("maps");
    collection.insertMany(testdb, (err, res) => {
        console.log("Data inserted into the collection");
        client.close();
    });
});