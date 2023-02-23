import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Touchpoint = ({ item, index }) => {
  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`${{ ...provided.draggableProps.style }} ${snapshot.isDragging ? "bg-gray-300" : "bg-white"}
                select-none rounded-lg border border-black my-1 text-sm px-1 w-fit h-fit min-h-[25px]`}
          >
            {item.title}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Touchpoint;
