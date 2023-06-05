import React, { useEffect } from 'react'


const TouchPointInfoModal = ({ open, onClose, item, setOpenEDTPModal, setEditDeleteTouchpointItem, setOpenDelConfirmModal, setDelConfirmTouchpointItem }) => {
    useEffect(() => {
        setEditDeleteTouchpointItem(item)
        setDelConfirmTouchpointItem(item)
        console.log("changed item in edit/delete and confirmation")
        console.log(item.title)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    function closeTouchPointModalAndOpenEditDeleteTouchPointModal() {
        setOpenEDTPModal(true)
        onClose()
    }

    function closeTouchPointModalAndOpenDeleteConfirmationModal() {
        setOpenDelConfirmModal(true)
        onClose()
    }

    // if modal state is not true return nothing else return the modal view with data
    if (!open) return null;
    return (
        <div onClick={onClose} className='fixed flex bg-black/50 w-full h-full z-10 top-[0%] left-[0%]'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='fixed flex justify-center min-w-[200px] max-w-[20%] w-full h-auto top-[40%] left-[30%] sm:left-[35%] md:left-[40%] bg-[#ffffff] rounded-xl shadow-2xl shadow-slate-400 py-5 px-5'
            >
                <div className='flex flex-col justify-center text-center text-3xl'>
                    <button className='w-36 h-11 m-2 border-none bg-rev-black hover:text-rev-green text-rev-white rounded-lg text-xl cursor-pointer'
                        onClick={closeTouchPointModalAndOpenEditDeleteTouchPointModal}>
                        Edit
                    </button>
                    <button className='w-36 h-11 m-2 border-none bg-rev-black hover:text-rev-green text-rev-white rounded-lg text-xl cursor-pointer'
                        onClick={closeTouchPointModalAndOpenDeleteConfirmationModal}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TouchPointInfoModal
