import React, { useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import TouchPointModalInfo from './TouchPointModalInfo';
import Hamburger from '../images/hamburger.png'


const Touchpoint = (props) => {
    const item = props.item;
    const index = props.index;
    const borderColor = item.borderColor ? item.borderColor : "border-black";
    const borderSize = item.borderSize ? item.borderSize : "border";
    const [openModal, setOpenModal] = useState(false);

    return (
        <Draggable key={item._id} draggableId={item._id} index={index}>
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={
                        { ...provided.draggableProps.style } + " " + borderColor + " " + borderSize +
                        " select-none rounded-lg my-1 text-sm px-1 w-fit h-fit min-h-[25px] ".concat(
                            snapshot.isDragging
                                ? "bg-gray-300"
                                : "bg-white"
                        )
                    }
                >
                    <div className='flex flex-row justify-center items-center'>
                        <TouchPointModalInfo
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            title={item.title}
                            text={item.text} />
                        <div>{item.title}</div>
                        <button className="relative left-[10px] bottom-[7px] z-1"
                            onClick={() => setOpenModal(true)}>
                            <img src={Hamburger} alt="Hamburger" className='w-[15px]' />
                        </button>
                    </div>

                </div>
            )}
        </Draggable>
    )
}

export default Touchpoint;