import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Touchpoint } from "../components";

const Column = (props) => {
	const id = props.id;
	const column = props.column;

	return (
		<div key={id}>
			{/* <p>{column.name}</p> */}
			<Droppable droppableId={id}>
				{(provided, snapshot) => {
					return (
						<div {...provided.droppableProps} ref={provided.innerRef}
							className={"w-60 min-h-[150px] border border-slate-300 rounded-lg".concat(
								snapshot.isDraggingOver ? " bg-slate-200" : " bg-slate-100"
							)}
						>
							{column.touchpoints.map((item, index) => {
								return <Touchpoint item={item} index={index} />;
							})}
							{provided.placeholder}
						</div>
					);
				}}
			</Droppable>
		</div>
	);
};

export default Column;
