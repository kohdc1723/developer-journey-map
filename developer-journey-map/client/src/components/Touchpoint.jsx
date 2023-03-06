import React, { useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import TouchPointModalInfo from './TouchPointModalInfo';


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
                    <button className="block"
                        onClick={() => setOpenModal(true)}>
                        Open Touchpoint</button>
                    <TouchPointModalInfo
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        title={item.title}
                        text={item.text} />
                    {item.title}
                </div>
            )}
        </Draggable>
    )
}

export default Touchpoint;