import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Touchpoint } from "../components";
import "../assets/styles/map.css";

const Column = ({ id, column, columns, setColumns, openModalWithItem, openCreateTouchpointModal }) => {
    return (
        <div key={id} className="grid-cell droppable-cell">
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
                                return (
                                    <Touchpoint
                                        item={item}
                                        index={index}
                                        key={item._id}
                                        openModalWithItem={openModalWithItem}
                                    />
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
            <button
                className="add-button"
                onClick={() => {
                    openCreateTouchpointModal({id: id, column: column, columns: columns, setColumns: setColumns});
                }}
            >
                +
            </button>
        </div>
    );
};

export default Column;
