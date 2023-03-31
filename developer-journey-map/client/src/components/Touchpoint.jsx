import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import Hamburger from '../images/hamburger.png'

const Touchpoint = (props) => {
    const item = props.item;
    const index = props.index;
    // if border color or size do not exist set to default border-black or border size border respectively
    const borderColor = item.borderColor ? item.borderColor : "border-black";
    const borderSize = item.borderSize ? item.borderSize : "border";

    return (
        <Draggable 
            key={item._id}
            draggableId={item._id.toString()}
            index={index}
        >
            {(provided, snapshot) => (
                <div
                    id={item._id}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={
                        { ...provided.draggableProps.style } + " " + borderColor + " " + borderSize +
                        " touchpoint relative z-10 select-none rounded-lg my-1 text-sm px-1 w-full h-fit min-h-[25px]".concat(
                            snapshot.isDragging
                                ? "opacity-50"
                                : ""
                        )
                    }
                >
                    <div className='flex flex-row justify-center items-center'
                        onClick={() => props.openViewModalWithItem(item)}>
                        <div>{item.title}</div>
                    </div>
                    <div className="absolute right-[-5px] top-[-5px]  z-0"
                        onClick={() => props.openModalWithItem(item)}>
                        <img src={Hamburger} alt="Hamburger" className='w-[15px]' />
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Touchpoint;
