import { MongoClient } from "mongodb";
import { v4 as uuid } from "uuid";
import * as dotenv from "dotenv";
dotenv.config();

const testDb = [
    {
        "_id": "0",
        "name": "discover_internal",
        "position": "internal",
        "touchpoints": [
            {
                "_id": uuid(),
                "title": "Dev Hub Landing Page"
            },
            {
                "_id": uuid(),
                "title": "Newsletter"
            }
        ]
    },
    {
        "_id": "1",
        "name": "evaluate_internal",
        "position": "internal",
        "touchpoints": [
            {
                "_id": uuid(),
                "title": "Docs Landing Page"
            },
            {
                "_id": uuid(),
                "title": "FAQs"
            }
        ]
    },
    {
        "_id": "2",
        "name": "learn_internal",
        "position": "internal",
        "touchpoints": [
            {
                "_id": uuid(),
                "title": "Code Samples"
            },
            {
                "_id": uuid(),
                "title": "Tutorials"
            }
        ]
    },
    {
        "_id": "3",
        "name": "build_internal",
        "position": "internal",
        "touchpoints": [
            {
                "_id": uuid(),
                "title": "Change Log"
            },
            {
                "_id": uuid(),
                "title": "Sandbox"
            }
        ]
    },
    {
        "_id": "4",
        "name": "scale_internal",
        "position": "internal",
        "touchpoints": [
            {
                "_id": uuid(),
                "title": "Showcase"
            },
            {
                "_id": uuid(),
                "title": "Certitication"
            }
        ]
    },
    {
        "_id": "5",
        "name": "discover_external",
        "position": "external",
        "touchpoints": [
            {
                "_id": uuid(),
                "title": "Syndication"
            },
            {
                "_id": uuid(),
                "title": "Referrals"
            }
        ]
    },
    {
        "_id": "6",
        "name": "evaluate_external",
        "position": "external",
        "touchpoints": [
            {
                "_id": uuid(),
                "title": "GitHub"
            },
            {
                "_id": uuid(),
                "title": "Stack Overflow"
            }
        ]
    },
    {
        "_id": "7",
        "name": "learn_external",
        "position": "external",
        "touchpoints": [
            {
                "_id": uuid(),
                "title": "Technology Dependencies"
            }
        ]
    },
    {
        "_id": "8",
        "name": "build_external",
        "position": "external",
        "touchpoints": []
    },
    {
        "_id": "9",
        "name": "scale_external",
        "position": "external",
        "touchpoints": []
    }
];

const uri = "mongodb+srv://team13:team13@developer-journey-map.xx3xnsr.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const db = client.db("test");
    const collection = db.collection("columns");
    collection.insertMany(testDb, (err, res) => {
        console.log("Data inserted into the collection");
        client.close();
    });
});

// run command "node testdb.js" in this directory to insert test db