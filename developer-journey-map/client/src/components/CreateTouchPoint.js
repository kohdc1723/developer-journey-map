import React from 'react'

function CreateTouchPoint({ setModal, id, column, columns }) {
    return (
        <div className="bg-gray-300 fixed flex justify-center items-center">
            <div className="w-96 h-96 rounded-xl bg-white shadow-2xl shadow-slate-400 flex flex-col p-25">
                <div className="flex flex-end">
                    <button className='bg-transparent border-none text-2xl cursor-pointer'
                        onClick={() => {
                            setModal({
                                ...columns,
                                [id]: {
                                    ...column,
                                    createModal: false,
                                },
                            });
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="flex flex-[50%] justify-center items-center text-center text-3xl">
                    <p>Please input touchpoint item</p>
                </div>
                <div className="flex flex-[20%] justify-center items-center">
                    <button className='w-36 h-11 m-2 border-none bg-red-600 text-white rounded-lg text-xl cursor-pointer'
                        onClick={() => {
                            setModal({
                                ...columns,
                                [id]: {
                                    ...column,
                                    createModal: false,
                                },
                            });
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button className='w-36 h-11 m-2 border-none bg-indigo-500 text-white rounded-lg text-xl cursor-pointer'>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default CreateTouchPoint