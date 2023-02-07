import React, { useState } from "react";
import "../index.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Stage from "../components/Stage";

// temp items
const itemsFromBackend = [
	{ id: uuid(), title: "DevHub" },
	{ id: uuid(), title: "Blog" },
	{ id: uuid(), title: "Docs" },
	{ id: uuid(), title: "FAQs" },
	{ id: uuid(), title: "Training" },
	{ id: uuid(), title: "Tutorials" },
	{ id: uuid(), title: "Sandbox" },
	{ id: uuid(), title: "Extensions" },
	{ id: uuid(), title: "Certification" },
	{ id: uuid(), title: "Showcase" },
];

// temp columns
const columnsFromBackend = {
	[uuid()]: { name: "DISCOVER", items: itemsFromBackend },
	[uuid()]: { name: "EVALUATE", items: [] },
	[uuid()]: { name: "LEARN", items: [] },
	[uuid()]: { name: "BUILD", items: [] },
	[uuid()]: { name: "SCALE", items: [] },
};

// on drag handler
const onDragEnd = (result, columns, setColumns) => {
	// if drag and drop to non-droppable area
	if (!result.destination) return;

	const { source, destination } = result;

	// if drag and drop to different columns
	if (source.droppableId !== destination.droppableId) {
		const srcColumn = columns[source.droppableId];
		const destColumn = columns[destination.droppableId];
		const srcItems = [...srcColumn.items];
		const destItems = [...destColumn.items];

		const [draggedItem] = srcItems.splice(source.index, 1);
		destItems.splice(destination.index, 0, draggedItem);
		setColumns({
			...columns,
			[source.droppableId]: {
				...srcColumn,
				items: srcItems,
			},
			[destination.droppableId]: {
				...destColumn,
				items: destItems,
			},
		});
	} else {
		// if drag and drop within same column
		// get source column by draggableId
		const sourceColumn = columns[source.droppableId];
		// copy items of source column
		const copiedItems = [...sourceColumn.items];
		// remove dragged item from copiedItems and save it in draggedItem
		const [draggedItem] = copiedItems.splice(source.index, 1);
		// add draggedItem in the destination
		copiedItems.splice(destination.index, 0, draggedItem);
		setColumns({
			...columns,
			[source.droppableId]: {
				...sourceColumn,
				items: copiedItems,
			},
		});
	}
};

const Map = () => {
	const [title, setTitle] = useState("Developer Journey Map");
	const [columns, setColumns] = useState(columnsFromBackend);

	return (
		<div className="p-3">
			<h2 className="text-3xl">{title}</h2>

			<div className="flex justify-center h-full">
				<DragDropContext
					onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
				>
					{Object.entries(columns).map(([id, column]) => {
						return (
							<div key={id} className="m-1">
								<h2>{column.name}</h2>
								<Droppable droppableId={id}>
									{(provided, snapshot) => {
										return (
											<div
												{...provided.droppableProps}
												ref={provided.innerRef}
												className={"w-40 min-h-[500px] p-1".concat(
													snapshot.isDraggingOver
														? " bg-slate-200"
														: " bg-slate-300"
												)}
											>
												{column.items.map((item, index) => {
													return (
														<Draggable
															key={item.id}
															draggableId={item.id}
															index={index}
														>
															{(provided, snapshot) => {
																return (
																	<div
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		ref={provided.innerRef}
																		className={
																			{ ...provided.draggableProps.style } +
																			"select-none text-white m-1 min-h-[50px] ".concat(
																				snapshot.isDragging
																					? "bg-slate-400"
																					: "bg-slate-500"
																			)
																		}
																	>
																		{item.title}
																	</div>
																);
															}}
														</Draggable>
													);
												})}
												{provided.placeholder}
											</div>
										);
									}}
								</Droppable>
							</div>
						);
					})}
				</DragDropContext>
			</div>
		</div>
	);
};

export default Map;
