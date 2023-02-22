import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Touchpoint } from "../components";
import CreateTouchPoint from "../components/CreateTouchPoint";

const Column = ({id, column, columns, setColumns}) => {
	return (
		<div key={id} className="py-1 m-1">
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
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className={"relative min-h-[150px] pb-8 rounded-lg ".concat(
								snapshot.isDraggingOver ? " bg-gray-100" : " bg-white"
							)}
						>
							{column.touchpoints.map((item, index) => {
								return <Touchpoint item={item} index={index} />;
							})}

							<button onClick={() => {
								setColumns({
									...columns,
									[id]: {
										...column,
										createModal: true,
									},
								});
							}} className="my-1 text-gray-500 text-center w-full border border-gray-500 rounded-lg absolute bottom-0">+</button>

							{provided.placeholder}
						</div>
					);
				}}
			</Droppable>
		</div>
	);
};

export default Column;
