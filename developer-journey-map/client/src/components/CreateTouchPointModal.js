import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build'

const options = [
    { value: 'border-yellow-300', label: 'Yellow' },
    { value: 'border-green-600', label: 'Green' },
    { value: 'border-red-600', label: 'Red' },
    { value: 'border-fuchsia-700', label: 'Purple' },
]

const borderOptions = [
    { value: 'border', label: 'Small' },
    { value: 'border-2', label: 'Medium' },
    { value: 'border-4', label: 'Large' },
    { value: 'border-8', label: 'Extra Large' },
]

const editorConfiguration = {
    toolbar: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'alignment',
        'blockQuote',
        '|',
        'undo',
        'redo'],
};

function CreateTouchPointModal({ columns, setModal, id, column }) {
    const [touchTitle, setTouchTitle] = useState(null);
    const [touchColor, setTouchColor] = useState("border-black");
    const [touchBSize, setTouchBSize] = useState("border");
    const [touchText, setTouchText] = useState("");
    function getTouchTitle(event) {
        setTouchTitle(event.target.value)
    }
    function setColor(selectedOption) {
        console.log("setColor", selectedOption);
        setTouchColor(selectedOption.value);
    }
    function setSize(selectedOption) {
        console.log("setSize", selectedOption);
        setTouchBSize(selectedOption.value);
    }
    function addTouchPoint() {
        setModal({
            ...columns,
            [id]: {
                ...column,
                touchpoints: [...column.touchpoints, { _id: uuid(), title: touchTitle, borderColor: touchColor, borderSize: touchBSize, text: touchText }],
                createModal: false,
            },
        });
    }
    return (
        <div className='fixed flex bg-black/50 w-full h-full z-10 top-[0%] left-[0%]'
            onClick={() => {
                setModal({
                    ...columns,
                    [id]: {
                        ...column,
                        createModal: false,
                    },
                });
            }}>
            <div onClick={(e) => {
                e.stopPropagation();
            }}
                className="fixed flex flex-col justify-evenly max-w-[50%] w-full h-auto top-[10%] left-[25%] bg-[#ffffff] rounded-xl shadow-2xl shadow-slate-400 py-5 px-5">
                {/* <div className="flex flex-row-reverse">
                    <button className='border-none text-2xl cursor-pointer p-3'
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
                </div> */}
                <div className="flex flex-row justify-center text-center text-3xl">
                    <p>Touchpoint Title:</p>
                </div>
                <div className="flex flex-row justify-center text-center text-3xl">
                    <input className="border-2 border-black" type="text" onChange={getTouchTitle} />
                </div>
                <div className="editor flex-row justify-center py-2">
                    <CKEditor
                        editor={Editor}
                        config={editorConfiguration}
                        data={touchText}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setTouchText(data)
                        }}
                    />
                </div>
                <div className="flex flex-row justify-around text-center text-xl">
                    <div className="flex flex-col justify-center text-center">
                        <p>Border Color:</p>
                        <Select options={options} onChange={setColor} placeholder="Black" className="py-2" />
                    </div>
                    <div className="flex flex-col justify-center text-center">
                        <p>Border Size:</p>
                        <Select options={borderOptions} onChange={setSize} placeholder="Small" className="py-2" />
                    </div>
                </div>
                <div className="flex flex-row justify-center">
                    <button className='w-36 h-11 m-2 border-none bg-rev-black hover:text-rev-green text-rev-white rounded-lg text-xl cursor-pointer'
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
                    <button className='w-36 h-11 m-2 border-none bg-rev-green hover:text-rev-black text-rev-white rounded-lg text-xl cursor-pointer' onClick={() => {
                        addTouchPoint();
                    }}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default CreateTouchPointModal