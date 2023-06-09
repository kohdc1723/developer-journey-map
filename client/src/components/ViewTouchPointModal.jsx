import React from 'react'
import parse from 'html-react-parser';

const ViewTouchpointModal = ({ open, onClose, item }) => {
    
    // if modal state is not true return nothing else return the modal view with data
    if (!open) return null;
    return (
        <div onClick={onClose} className='fixed flex bg-black/50 w-full h-full z-10 top-[0%] left-[0%]'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='fixed flex max-w-[40%] w-full h-[50%] top-[30%] left-[30%] bg-[#ffffff] z-10'
            >
                <div className='flex flex-col w-full justify-around bg-white'>
                    <div className='flex flex-row justify-center font-bold text-[30px]'>
                        {item.title}
                    </div>
                    {item.text && (
                        <div className='flex flex-row justify-center'>
                            {parse(item.text)}
                        </div>
                    )}
                    <div className="flex flex-row justify-center items-center">
                        <button className='w-36 h-11 m-2 border-none bg-rev-green hover:text-rev-black text-rev-white rounded-lg text-xl cursor-pointer'
                        onClick={onClose}>
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTouchpointModal
