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

function CreateTouchPoint({ columns, setModal, id, column }) {
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
        <div className="bg-gray-300 flex justify-center items-center fixed top-1/4 right-1/4 z-10">
            <div className="w-auto h-auto rounded-xl bg-white shadow-2xl shadow-slate-400 flex flex-col p-25">
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
                <div className="flex flex-[50%] justify-center items-center text-center text-3xl">
                    <p>Please select border color</p>
                </div>
                <Select options={options} onChange={setColor} placeholder="Black" className="py-2" />
                <div className="flex flex-[50%] justify-center items-center text-center text-3xl">
                    <p>Please select border size</p>
                </div>
                <Select options={borderOptions} onChange={setSize} placeholder="Small" className="py-2" />
                <div className="editor">
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
                <div className="flex flex-[20%] justify-center items-center">
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

export default CreateTouchPoint