import { MongoClient } from "mongodb";
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
                title: "Dev Hub Landing Page"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "SEO / PPC"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Social"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Events"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Blog"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Newsletter"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Case Studies"
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
                title: "Docs Landing Page"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "FAQs"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Product Pages"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Forums"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Use Cases"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Pricing Page"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Webinars"
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
                title: "Getting Started / Quick Start Guide"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Code Samples"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Tutorials"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Sign Up / Registration"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Office Hours"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Training"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Learning Resources"
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
                title: "Extensions"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Sandbox"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Reference Guide"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Change Log"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Support"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Workshops"
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
                title: "Developer Success"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "SLAs"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Product Roadmap"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Showcase"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Ambassador Program"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Partner Program"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Certification"
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
                title: "Online Media / Press"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Syndication"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Events, Meetups, Hackathons"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Referrals"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Online & Offline Groups"
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
                title: "GitHub"
            },
            {
                _id: mongoose.Types.ObjectId(),
                title: "Stack Overflow"
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
                title: "Technology Dependencies"
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

const defaultQuestions0 = [
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 0,
        question: "What is it?"
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 1,
        question: "Could it solve my problem?"
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 2,
        question: "Is it credible?"
    }
];

const defaultQuestions1 = [
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 0,
        question: "Does it look easy to use?"
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 1,
        question: "Are there any red flags?"
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 2,
        question: "Is pricing a barrier?"
    }
];

const defaultQuestions2 = [
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 0,
        question: "Time to \"Hello World\"?"
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 1,
        question: "Are the docs a good experience?"
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 2,
        question: "Do I have confidence?"
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 3,
        question: "Is there a community?"
    }
];

const defaultQuestions3 = [
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 0,
        question: "Speed to MVP"
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 1,
        question: "Is the product a good experience?"
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 2,
        question: "How do I get support?"
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 3,
        question: "Is it value for money?"
    }
];

const defaultQuestions4 = [
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 0,
        question: "Can I do more?"
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 1,
        question: "How do I give feedback?"
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 2,
        question: "How can I contribute?"
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstIndex: 3,
        question: "Will the product grow with me?"
    }
];

const defaultQuestionColumn = [
    {
        _id: mongoose.Types.ObjectId(),
        qstColIndex: 0,
        questions: defaultQuestions0,
        qstCounter: 3
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstColIndex: 1,
        questions: defaultQuestions1,
        qstCounter: 3
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstColIndex: 2,
        questions: defaultQuestions2,
        qstCounter: 4
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstColIndex: 3,
        questions: defaultQuestions3,
        qstCounter: 4
    },
    {
        _id: mongoose.Types.ObjectId(),
        qstColIndex: 4,
        questions: defaultQuestions4,
        qstCounter: 4
    }
];

const testdb = [
    {
        _id: mongoose.Types.ObjectId(),
        uid: "1",
        lastModified: new Date(),
        title: "Map1",
        qstColumns: defaultQuestionColumn,
        columns: defaultColumn
    },
    {
        _id: mongoose.Types.ObjectId(),
        uid: "2",
        lastModified: new Date(),
        title: "Map2",
        qstColumns: defaultQuestionColumn,
        columns: defaultColumn
    },
    {
        _id: mongoose.Types.ObjectId(),
        uid: "2",
        lastModified: new Date(),
        title: "Map22",
        qstColumns: defaultQuestionColumn,
        columns: defaultColumn
    },
    {
        _id: mongoose.Types.ObjectId(),
        uid: "3",
        lastModified: new Date(),
        title: "Map3",
        qstColumns: defaultQuestionColumn,
        columns: defaultColumn
    },
];

const uri = "mongodb+srv://team13:team13@developer-journey-map.xx3xnsr.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const db = client.db("test4");
    const collection = db.collection("maps");
    collection.insertMany(testdb, (err, res) => {
        console.log("Data inserted into the collection");
        client.close();
    });
});