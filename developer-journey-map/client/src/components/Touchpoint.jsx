import React from 'react';
import { Draggable } from "react-beautiful-dnd";

const Touchpoint = ({item, index}) => {
    return (
        <Draggable key={item.uuid} draggableId={item.uuid} index={index}>
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
                        {item.content}
                    </div>
                );
            }}
        </Draggable>
    )
}

export default Touchpoint;