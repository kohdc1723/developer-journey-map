import React from 'react'
import parse from 'html-react-parser';

const TouchPointModalInfo = ({ open, onClose, title, text }) => {
    if (!open) return null;
    return (
        <div onClick={onClose} className='fixed flex bg-black/50 w-full h-full z-10 top-[0%] left-[0%]'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='fixed flex max-w-[40%] w-full h-[50%] top-[30%] left-[30%] bg-[#ffffff]'
            >
                <div className='flex flex-col w-full justify-evenly bg-white'>
                    <div className='flex flex-row justify-center font-bold text-[30px]'>
                        {title}
                    </div>
                    {text && (
                        <div className='flex flex-row justify-center'>
                            {parse(text)}
                        </div>
                    )}
                </div>


            </div>
        </div>
    )
}

export default TouchPointModalInfo