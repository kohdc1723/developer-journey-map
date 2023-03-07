import React, { useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import TouchPointModalInfo from './TouchPointModalInfo';
import Hamburger from '../images/hamburger.png'


const Touchpoint = (props) => {
    const item = props.item;
    const index = props.index;
    // if border color or size do not exist set to default border-black or border size border respectively
    const borderColor = item.borderColor ? item.borderColor : "border-black";
    const borderSize = item.borderSize ? item.borderSize : "border";
    // Our state to check if we want to show our modal
    const [openModal, setOpenModal] = useState(false);


    return (
        <Draggable key={item._id} draggableId={item._id} index={index}>
            {(provided, snapshot) => (
                <div
            id={item._id}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    // className={
                    //     { ...provided.draggableProps.style } + " " + borderColor + " " + borderSize +
                    //     " select-none rounded-lg my-1 text-sm px-1 w-fit h-fit min-h-[25px] ".concat(
                    //         snapshot.isDragging
                    //             ? "opacity-50"
                    //             : ""
                    //     )
                    // }
                    className={`${{ ...provided.draggableProps.style }} ${snapshot.isDragging ? "touchpoint-on-dragging" : "touchpoint"}`}
                >
                    <div className='flex flex-row justify-center items-center'>
                        <TouchPointModalInfo
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            title={item.title}
                            text={item.text} />
                        <div>{item.title}</div>
                    </div>
                    <button className="absolute right-[-5px] top-[-5px]  z-0"
                      onClick={() => setOpenModal(true)}>
                      <img src={Hamburger} alt="Hamburger" className='w-[15px]' />
                    </button>

                </div>
            )}
        </Draggable>
    )
};

// import React from "react";
// import { Draggable } from "react-beautiful-dnd";
// import "../assets/styles/map.css";

// const Touchpoint = ({ item, index }) => {
//   return (
//     <Draggable key={item._id} draggableId={item._id} index={index}>
//       {(provided, snapshot) => {
//         return (
//           <div
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             ref={provided.innerRef}
//             className={`${{ ...provided.draggableProps.style }} ${snapshot.isDragging ? "touchpoint-on-dragging" : "touchpoint"}`}
//           >
//             {item.content}
//           </div>
//         );
//       }}
//     </Draggable>
//   );
// };

export default Touchpoint;