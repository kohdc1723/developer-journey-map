import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build'

// Provides selection for touchpoint border color. The value is the tailwind css and the label is what is shown in the select.
const options = [
    { value: 'border-yellow-300', label: 'Yellow' },
    { value: 'border-green-600', label: 'Green' },
    { value: 'border-red-600', label: 'Red' },
    { value: 'border-fuchsia-700', label: 'Purple' },
]

// Provides selection for touchpoint border size.
const borderOptions = [
    { value: 'border', label: 'Small' },
    { value: 'border-2', label: 'Medium' },
    { value: 'border-4', label: 'Large' },
    { value: 'border-8', label: 'Extra Large' },
]

// This changes what toolbar buttons are shown in the text editor
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

function CreateTouchPointModal({ open, onClose, item, mapID, refreshMap, setRefreshMap }) {

    useEffect(() => {
        setTouchTitle("Placeholder")
        setTouchColor("border-black")
        setTouchBSize("border")
        setTouchText("Placeholder")
    }, [open]);

    // Saved state for touchpoint title
    const [touchTitle, setTouchTitle] = useState(null);
    // Saved state for touchpoint border color
    const [touchColor, setTouchColor] = useState("border-black");
    // Save state for touchpoint border size
    const [touchBSize, setTouchBSize] = useState("border");
    // Save state for touchpoint text
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
    // This adds a touchpoint via PUT by pushing a touchpoint object into the touchpoint array of the specified column columnId
    const addTouchPoint = async() => {
        // old method of creating touchpoints
        // item.setColumns({
        //     ...item.columns,
        //     [item.id]: {
        //         ...item.column,
        //         touchpoints: [...item.column.touchpoints, { _id: new mongoose.Types.ObjectId, title: touchTitle, borderColor: touchColor, borderSize: touchBSize, text: touchText }],
        //         createModal: false,
        //     },
        // });
        const response = await fetch(`http://localhost:3800/api/map/newtouchpoint/${mapID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: touchTitle,
                borderColor: touchColor,
                borderSize: touchBSize,
                text: touchText,
                columnId: item.column._id
            })
        });
        setRefreshMap(!refreshMap)
        onClose();
    }
    // if modal state is not true return nothing else return the modal view with data
    if (!open) return null;
    return (
        /* 
        This outer div is the greyed out region of the modal that spans the entire screen.
        When user clicks on this region the modal is closed by setting a temporary attribute
        createModal to false. This attribute is temporary because the schema doesn't have it
        so it is not save to MongoDb but is still used to open individual touchpoint modals.
        */
        <div onClick={onClose} className='fixed flex bg-black/50 w-full h-full z-10 top-[0%] left-[0%]'>
            {/* Need this to close out child elements when clicking on grey region */}
            <div onClick={(e) => {
                e.stopPropagation();
            }}
                className="fixed flex flex-col justify-evenly max-w-[50%] w-full h-auto top-[10%] left-[25%] bg-[#ffffff] rounded-xl shadow-2xl shadow-slate-400 py-5 px-5">
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
                        onClick={onClose} 
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button className='w-36 h-11 m-2 border-none bg-rev-green hover:text-rev-black text-rev-white rounded-lg text-xl cursor-pointer'
                    onClick={() => {
                        onClose();
                        addTouchPoint();
                    }}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default CreateTouchPointModal