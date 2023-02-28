import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../assets/styles/map.css";

const Touchpoint = ({ item, index }) => {
  return (
    <Draggable key={item.uuid} draggableId={item.uuid} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`${{ ...provided.draggableProps.style }} ${snapshot.isDragging ? "touchpoint-on-dragging" : "touchpoint"}`}
          >
            {item.content}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Touchpoint;