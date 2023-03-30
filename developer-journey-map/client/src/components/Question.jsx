import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateQuestion, deleteQuestion } from "../utils/questionFunctions";
import { BsFillTrashFill } from "react-icons/bs";
import "../assets/styles/map.css";

const Question = ({ qstColumn, qst, qstColumnId, index }) => {
    const { id } = useParams();

    const [question, setQuestion] = useState(qst.question);
    const [editable, setEditable] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setEditable(true);
    };

    const handleBlur = async (e) => {
        e.preventDefault();
        const updatedQuestion = e.target.value.trim();

        const mapId = id;
        const questionColumnId = qstColumnId;
        const questionId = qst._id;

        await updateQuestion(mapId, questionColumnId, questionId, updatedQuestion);

        if (updatedQuestion === "") {
            qstColumn.questions.splice(index, 1);
        } else {
            setQuestion(updatedQuestion);
        }

        setEditable(false);
    };

    const handleChange = (e) => {
        e.preventDefault();
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const mapId = id;
        const questionColumnId = qstColumnId;
        const questionId = qst._id;

        await deleteQuestion(mapId, questionColumnId, questionId);
        qstColumn.questions.splice(index, 1);
    };

    if (editable) {
        return (
            <div className="flex">
                <div className="question-index">{`${index + 1}. `}</div>
                <div className="editable-question">
                    <textarea
                        wrap="soft"
                        className="questionTextarea"
                        autoFocus
                        defaultValue={`${question}`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <BsFillTrashFill
                        className="trash"
                        onMouseDown={handleDelete}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex">
                <div className="question-index">{`${index + 1}. `}</div>
                <div className="question-item" onClick={handleClick}>{`${question}`}</div>
            </div>
        );
    }
};

export default Question;
