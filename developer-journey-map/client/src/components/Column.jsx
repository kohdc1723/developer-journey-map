import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Touchpoint } from "../components";
import CreateTouchPoint from "../components/CreateTouchPoint";
import "../assets/styles/map.css";

const Column = ({ id, column, columns, setColumns }) => {
  return (
    <div key={id} className="grid-cell droppable-cell">
      {column.createModal && (
        <CreateTouchPoint
          setModal={setColumns}
          id={id}
          column={column}
          columns={columns}
        />
      )}

      <Droppable droppableId={id}>
        {(provided, snapshot) => {
          return (
            <div {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${
                snapshot.isDraggingOver ? "droppable-field-on-dragging" : "droppable-field"
              }`}
            >
              {column.touchpoints.map((item, index) => {
                return <Touchpoint item={item} index={index} key={item._id} />;
              })}

              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>

      <button
        className="add-button"
        onClick={() => {
          setColumns({
            ...columns,
            [id]: {
              ...column,
              createModal: true,
            }
          });
        }}
      >
        +
      </button>
    </div>
  );
};

export default Column;
