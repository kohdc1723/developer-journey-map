import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function CreateTouchPoint({ columns, setModal, id, column }) {
    const [touchTitle, setTouchTitle] = useState(null);
    function getTouchTitle(event) {
        setTouchTitle(event.target.value)
    }
    function addTouchPoint() {
        setModal({
            ...columns,
            [id]: {
                ...column,
                items: [...column.items, { id: uuid(), title: touchTitle }],
                createModal: false,
            },
        });
    }
    return (
        <div className="bg-gray-300 fixed flex justify-center items-center">
            <div className="w-96 h-96 rounded-xl bg-white shadow-2xl shadow-slate-400 flex flex-col p-25">
                <div className="flex flex-end flex-row-reverse">
                    <button className='bg-transparent border-none text-2xl cursor-pointer p-2'
                        onClick={() => {
                            setModal({
                                ...columns,
                                [id]: {
                                    ...column,
                                    createModal: false,
                                },
                            });
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="flex flex-[50%] justify-center items-center text-center text-3xl">
                    <p>Please input touchpoint item</p>
                </div>
                <div className="flex flex-[50%] justify-center items-center text-center text-3xl">
                    <input className="border-2 border-black" type="text" onChange={getTouchTitle} />
                </div>
                <div className="flex flex-[20%] justify-center items-center">
                    <button className='w-36 h-11 m-2 border-none bg-red-600 text-white rounded-lg text-xl cursor-pointer'
                        onClick={() => {
                            setModal({
                                ...columns,
                                [id]: {
                                    ...column,
                                    createModal: false,
                                },
                            });
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button className='w-36 h-11 m-2 border-none bg-indigo-500 text-white rounded-lg text-xl cursor-pointer' onClick={() => {
                        addTouchPoint();
                    }}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default CreateTouchPoint