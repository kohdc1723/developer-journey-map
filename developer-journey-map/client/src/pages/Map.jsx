import React, { useState, useEffect } from "react";
import "../index.css";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "../components";

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

	// will be called once at the very beginning
	useEffect(() => {
		// load the entire columns from server and setColumns
		const initColumns = async () => {
			const response = await fetch("http://localhost:3800/api/column");
			const columns = await response.json();
			setColumns(columns.data);
		}
		// execute
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
		// execute
		updateColumns();
	}, [columns]);

	return (
		<DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
			<div className="p-3">
				<h2 className="text-xl pb-3">{title}</h2>
				<div>
					<div className="grid grid-cols-6 grid-row-5">
						<div className="bg-black text-white w-48 text-center py-1 rounded-t-lg">STAGE</div>
						<div className="bg-black text-white text-center py-1">DISCOVER</div>
						<div className="bg-black text-white text-center py-1">EVALUATE</div>
						<div className="bg-black text-white text-center py-1">LEARN</div>
						<div className="bg-black text-white text-center py-1">BUILD</div>
						<div className="bg-black text-white text-center py-1">SCALE</div>

						<div className="bg-black text-white w-48 text-center py-1">GOALS / NEEDS</div>
						<div className="text-sm m-1 py-1">Is this of use to me?</div>
						<div className="text-sm m-1 py-1">Will it meet my needs?</div>
						<div className="text-sm m-1 py-1">How does it work?</div>
						<div className="text-sm m-1 py-1">Can I build a proof of concept?</div>
						<div className="text-sm m-1 py-1">Can I build to scale?</div>

						<div className="bg-black text-white w-48 text-center py-1">QUESTIONS</div>
						<div className="text-sm m-1 py-1">
							<div>1. What is it?</div>
							<div>2. Could it solve my problem?</div>
							<div>3. Is it credible?</div>
						</div>
						<div className="text-sm m-1 py-1">
							<div>1. Does it look easy to use?</div>
							<div>2. Are there any red flags?</div>
							<div>3. Is pricing a barrier?</div>
						</div>
						<div className="text-sm m-1 py-1">
							<div>1. Time to "Hello World"</div>
							<div>2. Are the docs a good experience?</div>
							<div>3. Do I have confidence?</div>
							<div>4. Is there a community?</div>
						</div>
						<div className="text-sm m-1 py-1">
							<div>1. Speed to MVP</div>
							<div>2. Is the product a good experience?</div>
							<div>3. How do I get support?</div>
							<div>4. Is it value for money?</div>
						</div>
						<div className="text-sm m-1 py-1">
							<div>1. Can I do more?</div>
							<div>2. How do I give feedback?</div>
							<div>3. How can I contribute?</div>
							<div>4. Will the product grow with me?</div>
						</div>

						<div className="bg-black text-white w-48 text-center py-1">INTERNAL TOUCHPOINTS</div>
						{Object.entries(columns)
							.filter(([id, column]) => column.position === "internal")
							.map(([id, column]) => (
								<Column id={id} key={id} column={column} columns={columns} setColumns={setColumns} />
							))
						}

						<div className="bg-black text-white w-48 text-center py-1 rounded-b-lg">EXTERNAL TOUCHPOINTS</div>
						{Object.entries(columns)
							.filter(([id, column]) => column.position === "external")
							.map(([id, column]) => (
								<Column id={id} key={id} column={column} columns={columns} setColumns={setColumns} />
							))
						}
					</div>
				</div>
			</div>
		</DragDropContext>
	);
};

export default Map;
