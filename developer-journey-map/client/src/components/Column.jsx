import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Touchpoint } from "../components";
import CreateTouchPoint from "../components/CreateTouchPoint";

const Column = (props) => {
	const id = props.id;
	const column = props.column;
	const columns = props.columns;
	const setColumns = props.setColumns;

	return (
		<div key={id}>
			<button onClick={() => {
				setColumns({
					...columns,
					[id]: {
						...column,
						createModal: true,
					},
				});
			}}>
				+
			</button>

			{column.createModal && <CreateTouchPoint setModal={setColumns} id={id} column={column} columns={columns} />}

			<Droppable droppableId={id}>
				{(provided, snapshot) => {
					return (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
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
