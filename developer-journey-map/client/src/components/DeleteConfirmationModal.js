import React from "react";

function DeleteConfirmationModal({ open, onClose, item, onItemChange, mapID, refreshMap, setRefreshMap }) {
    // This procs the useEffect to save touchpoint to MongoDb
    const deleteTouchpoint = async () => {
        const response = await fetch(`http://localhost:3800/api/map/deletetouchpoint/${mapID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: item._id,
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
                    <p>Are you sure?</p>
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
                            deleteTouchpoint();
                        }}>OK</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal