import React from 'react';
import { Draggable } from "react-beautiful-dnd";

const Touchpoint = (props) => {
    const item = props.item;
    const index = props.index; 

    return (
        <Draggable key={item._id} draggableId={item._id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={
                            { ...provided.draggableProps.style } +
                            "select-none rounded-lg border border-black my-1 text-sm px-1 w-fit h-fit min-h-[25px] ".concat(
                                snapshot.isDragging
                                    ? "bg-gray-300"
                                    : "bg-white"
                            )
                        }
                    >
                        {item.title}
                    </div>
                );
            }}
        </Draggable>
    )
}

export default Touchpoint;