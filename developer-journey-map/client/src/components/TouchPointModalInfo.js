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
                <div >
                    {title}
                </div>
                {text && (
                    <div >
                        {parse(text)}
                    </div>
                )}

            </div>
        </div>
    )
}

export default TouchPointModalInfo