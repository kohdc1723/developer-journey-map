import { MongoClient } from "mongodb";
import { v4 as uuid } from "uuid";
import * as dotenv from "dotenv";
dotenv.config();

const defaultColumn = [
    {
        "index": "0",
        "name": "discover_internal",
        "position": "internal",
        "touchpoints": [
            {
                "uuid": uuid(),
                "content": "Dev Hub Landing Page"
            },
            {
                "uuid": uuid(),
                "content": "Newsletter"
            }
        ]
    },
    {
        "index": "1",
        "name": "evaluate_internal",
        "position": "internal",
        "touchpoints": [
            {
                "uuid": uuid(),
                "content": "Docs Landing Page"
            },
            {
                "uuid": uuid(),
                "content": "FAQs"
            }
        ]
    },
    {
        "index": "2",
        "name": "learn_internal",
        "position": "internal",
        "touchpoints": [
            {
                "uuid": uuid(),
                "content": "Code Samples"
            },
            {
                "uuid": uuid(),
                "content": "Tutorials"
            }
        ]
    },
    {
        "index": "3",
        "name": "build_internal",
        "position": "internal",
        "touchpoints": [
            {
                "uuid": uuid(),
                "content": "Change Log"
            },
            {
                "uuid": uuid(),
                "content": "Sandbox"
            }
        ]
    },
    {
        "index": "4",
        "name": "scale_internal",
        "position": "internal",
        "touchpoints": [
            {
                "uuid": uuid(),
                "content": "Showcase"
            },
            {
                "uuid": uuid(),
                "content": "Certitication"
            }
        ]
    },
    {
        "index": "5",
        "name": "discover_external",
        "position": "external",
        "touchpoints": [
            {
                "uuid": uuid(),
                "content": "Syndication"
            },
            {
                "uuid": uuid(),
                "content": "Referrals"
            }
        ]
    },
    {
        "index": "6",
        "name": "evaluate_external",
        "position": "external",
        "touchpoints": [
            {
                "uuid": uuid(),
                "content": "GitHub"
            },
            {
                "uuid": uuid(),
                "content": "Stack Overflow"
            }
        ]
    },
    {
        "index": "7",
        "name": "learn_external",
        "position": "external",
        "touchpoints": [
            {
                "uuid": uuid(),
                "content": "Technology Dependencies"
            }
        ]
    },
    {
        "index": "8",
        "name": "build_external",
        "position": "external",
        "touchpoints": []
    },
    {
        "index": "9",
        "name": "scale_external",
        "position": "external",
        "touchpoints": []
    }
];

const testdb = [
    {
        uid: "1",
        title: "Map1",
        columns: defaultColumn
    },
    {
        uid: "2",
        title: "Map2",
        columns: defaultColumn
    },
    {
        uid: "3",
        title: "Map3",
        columns: defaultColumn
    },
];

const uri = "mongodb+srv://team13:team13@developer-journey-map.xx3xnsr.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const db = client.db("test2");
    const collection = db.collection("maps");
    collection.insertMany(testdb, (err, res) => {
        console.log("Data inserted into the collection");
        client.close();
    });
});