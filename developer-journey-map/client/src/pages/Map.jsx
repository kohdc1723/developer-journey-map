import React, { useState, useEffect } from "react";
import "../index.css";
import { DragDropContext } from "react-beautiful-dnd";
import { Column, Stage, GoalsAndNeeds } from "../components";

// on drag handler
const onDragEnd = (result, columns, setColumns) => {
	const { source, destination } = result;
	
	// if drag and drop to non-droppable area
	if (!result.destination) return;

	// if drag and drop to different columns
	if (source.droppableId !== destination.droppableId) {
		const srcColumn = columns[source.droppableId];
		const destColumn = columns[destination.droppableId];
		const srcItems = [...srcColumn.touchpoints];
		const destItems = [...destColumn.touchpoints];

		const [draggedItem] = srcItems.splice(source.index, 1);
		destItems.splice(destination.index, 0, draggedItem);
		setColumns({
			...columns,
			[source.droppableId]: {
				...srcColumn,
				touchpoints: srcItems,
			},
			[destination.droppableId]: {
				...destColumn,
				touchpoints: destItems,
			},
		});
	} else {
		// if drag and drop within same column
		// get source column by draggableId
		const sourceColumn = columns[source.droppableId];
		// copy items of source column
		const copiedItems = [...sourceColumn.touchpoints];
		// remove dragged item from copiedItems and save it in draggedItem
		const [draggedItem] = copiedItems.splice(source.index, 1);
		// add draggedItem in the destination
		copiedItems.splice(destination.index, 0, draggedItem);
		setColumns({
			...columns,
			[source.droppableId]: {
				...sourceColumn,
				touchpoints: copiedItems,
			},
		});
	}
}

const Map = () => {
	// hooks
	const [title, setTitle] = useState("Developer Journey Map");
	const [columns, setColumns] = useState([]);

	// load the entire columns from server and setColumns
	const initColumns = async () => {
		const response = await fetch("http://localhost:3800/api/column");
		const columns = await response.json();
		setColumns(columns.data);
	}

	// will be called once at the very beginning
	useEffect(() => {
		initColumns();
	}, []);
	
	// will be called whenever columns change
	useEffect(() => {
		// asynchronously auto-update db
		const updateColumns = async () => {
			const response = await fetch("http://localhost:3800/api/column", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(columns)
			});
			
			await response.json();
		}

		updateColumns();
	}, [columns]);

	return (
		<div className="p-3">
			<h2 className="text-xl">{title}</h2>
			<Stage />
			<GoalsAndNeeds />
			<div className="flex flex-col h-fit">
				<DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
					<div className="flex">
						<div className="w-32 bg-slate-700 p-1 text-slate-100 text-sm text-center">INTERNAL TOUCHPOINTS</div>
						{Object.entries(columns).map(([id, column]) => {
							if (column.position === "internal") {
								return (
									<Column id={id} column={column} columns={columns} setColumns={setColumns} />
								);
							}
						})}
					</div>
					<div className="flex">
						<div className="w-32 bg-slate-700 p-1 text-slate-100 text-sm text-center">EXTERNAL TOUCHPOINTS</div>
						{Object.entries(columns).map(([id, column]) => {
							if (column.position === "external") {
								return (
									<Column id={id} column={column} columns={columns} setColumns={setColumns} />
								);
							}
						})}
					</div>
				</DragDropContext>
			</div>
		</div>
	);
};

export default Map;
