import mongoose from "mongoose";

export const defaultColumn = [
    {
        _id: new mongoose.Types.ObjectId(),
        colIndex: "0",
        position: "internal",
        touchpoints: [
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Dev Hub Landing Page"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "SEO / PPC"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Social"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Events"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Blog"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Newsletter"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Case Studies"
            }
        ]
    },
    {
        _id: new mongoose.Types.ObjectId(),
        colIndex: "1",
        position: "internal",
        touchpoints: [
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Docs Landing Page"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "FAQs"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Product Pages"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Forums"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Use Cases"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Pricing Page"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Webinars"
            }
        ]
    },
    {
        _id: new mongoose.Types.ObjectId(),
        colIndex: "2",
        position: "internal",
        touchpoints: [
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Getting Started / Quick Start Guide"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Code Samples"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Tutorials"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Sign Up / Registration"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Office Hours"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Training"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Learning Resources"
            }
        ]
    },
    {
        _id: new mongoose.Types.ObjectId(),
        colIndex: "3",
        position: "internal",
        touchpoints: [
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Extensions"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Sandbox"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Reference Guide"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Change Log"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Support"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Workshops"
            }
        ]
    },
    {
        _id: new mongoose.Types.ObjectId(),
        colIndex: "4",
        position: "internal",
        touchpoints: [
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Developer Success"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "SLAs"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Product Roadmap"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Showcase"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Ambassador Program"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Partner Program"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Certification"
            }
        ]
    },
    {
        _id: new mongoose.Types.ObjectId(),
        colIndex: "5",
        position: "external",
        touchpoints: [
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Online Media / Press"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Syndication"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Events, Meetups, Hackathons"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Referrals"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Online & Offline Groups"
            }
        ]
    },
    {
        _id: new mongoose.Types.ObjectId(),
        colIndex: "6",
        position: "external",
        touchpoints: [
            {
                _id: new mongoose.Types.ObjectId(),
                title: "GitHub"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Stack Overflow"
            }
        ]
    },
    {
        _id: new mongoose.Types.ObjectId(),
        colIndex: "7",
        position: "external",
        touchpoints: [
            {
                _id: new mongoose.Types.ObjectId(),
                title: "Technology Dependencies"
            }
        ]
    },
    {
        _id: new mongoose.Types.ObjectId(),
        colIndex: "8",
        position: "external",
        touchpoints: []
    },
    {
        _id: new mongoose.Types.ObjectId(),
        colIndex: "9",
        position: "external",
        touchpoints: []
    }
];

const defaultQuestions0 = [
    {
        _id: new mongoose.Types.ObjectId(),
        question: "What is it?"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        question: "Could it solve my problem?"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        question: "Is it credible?"
    }
];

const defaultQuestions1 = [
    {
        _id: new mongoose.Types.ObjectId(),
        question: "Does it look easy to use?"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        question: "Are there any red flags?"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        question: "Is pricing a barrier?"
    }
];

const defaultQuestions2 = [
    {
        _id: new mongoose.Types.ObjectId(),
        question: "Time to \"Hello World\"?"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        question: "Are the docs a good experience?"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        question: "Do I have confidence?"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        question: "Is there a community?"
    }
];

const defaultQuestions3 = [
    {
        _id: new mongoose.Types.ObjectId(),
        question: "Speed to MVP"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        question: "Is the product a good experience?"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        question: "How do I get support?"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        question: "Is it value for money?"
    }
];

const defaultQuestions4 = [
    {
        _id: new mongoose.Types.ObjectId(),
        question: "Can I do more?"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        question: "How do I give feedback?"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        question: "How can I contribute?"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        question: "Will the product grow with me?"
    }
];

export const defaultQuestionsColumn = [
    {
        _id: new mongoose.Types.ObjectId(),
        qstColIndex: 0,
        questions: defaultQuestions0
    },
    {
        _id: new mongoose.Types.ObjectId(),
        qstColIndex: 1,
        questions: defaultQuestions1
    },
    {
        _id: new mongoose.Types.ObjectId(),
        qstColIndex: 2,
        questions: defaultQuestions2
    },
    {
        _id: new mongoose.Types.ObjectId(),
        qstColIndex: 3,
        questions: defaultQuestions3
    },
    {
        _id: new mongoose.Types.ObjectId(),
        qstColIndex: 4,
        questions: defaultQuestions4
    }
];
