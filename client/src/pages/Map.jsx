import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge, } from 'reactflow';
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "../components";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ArrowEdge from "../components/ArrowEdge";
import TouchpointNode from "../components/TouchpointNode";
import TouchPointModalInfo from "../components/TouchPointModalInfo";
import CreateTouchPointModal from "../components/CreateTouchPointModal";
import EditDeleteTouchPointModal from "../components/EditDeleteTouchPointModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import ViewTouchpointModal from "../components/ViewTouchPointModal";
import ExportIcon from '../assets/img/file.png'
import Question from "../components/Question";
import { createQuestion } from "../utils/questionFunctions.js";
import { onDragEnd, updateTitle, updateLastModified } from "../utils/mapFunctions";
import "reactflow/dist/style.css";
import "../index.css";
import "../assets/styles/map.css";

const nodeTypes = {
	touchpointNode: TouchpointNode,
};

const edgeTypes = {
	arrowEdge: ArrowEdge,
};

const Map = ({ user }) => {
	/* Define states */
	const { id } = useParams();

	// quick way to check for a refresh on Map when updating db without changing columns
	const [refreshMap, setRefreshMap] = useState(false);

	/* title states */
	const [title, setTitle] = useState("Untitled");
	const [titleEditable, setTitleEditable] = useState(false);
	const [titleLength, setTitleLength] = useState(title.length);

	const handleTitleChange = (e) => {
		e.preventDefault();
		const newTitle = e.target.value.trim();
		const newTitleSize = newTitle.length;
		setTitle(newTitle);
		setTitleLength(newTitleSize);
	};

	const handleTitleBlur = async (e) => {
		e.preventDefault();
		const value = e.target.value.trim();

		setTitleLength(value.length);
		updateTitle(id, value, setTitle);

		setTitleEditable(false);
	};

	const handleTitleClick = (e) => {
		e.preventDefault();
		setTitleEditable(true);
	};

	const [qstColumns, setQstColumns] = useState([]);

	const handleClickAdd = async (questionColumnId, questionColumnIndex) => {
		const newQuestion = await createQuestion(id, questionColumnId);
		qstColumns[questionColumnIndex].questions.push(newQuestion);
		setQstColumns(qstColumns);
	};

	const [columns, setColumns] = useState([]);

	const [openModal, setOpenModal] = useState(false);
	const [touchpointItem, setTouchpointItem] = useState({});

	const openModalWithItem = (item) => {
		setOpenModal(true);
		setTouchpointItem(item);
	};

	const [openCTPModal, setOpenCTPModal] = useState(false);
	const [columnInfo, setColumnInfo] = useState({});
	const openCreateTouchpointModal = (info) => {
		setOpenCTPModal(true);
		setColumnInfo(info);
	}
	// this state manages the ViewTouchPointModal
	const [openViewModal, setOpenViewModal] = useState(false);
	const openViewModalWithItem = (item) => {
		setOpenViewModal(true);
		setTouchpointItem(item);
	};
	// these state manages the EditDeleteTouchPointModal
	const [openEDTPModal, setOpenEDTPModal] = useState(false);
	const [editDeleteTouchpointItem, setEditDeleteTouchpointItem] = useState({})

	// this state manages the DeleteConfirmationModal
	const [openDelConfirmModal, setOpenDelConfirmModal] = useState(false);
	const [delConfirmTouchpointItem, setDelConfirmTouchpointItem] = useState({})

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const updateNode = useCallback(() => setNodes((ns) => {
		ns = [];
		Array.from(document.querySelectorAll('.touchpoint')).forEach((node) => {
			const id = node.id;
			const position = document.getElementById(id).getBoundingClientRect();
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const x = position.left - 20;
			const y = position.top + scrollTop - 75 + (position.height / 2);
			ns.push({ id: `${id}`, type: 'touchpointNode', position: { x: x, y: y } });
		});
		//console.log(dragging.valueOf());
		requestAnimationFrame(updateNode);
		return [...ns]
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}), []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, type: 'arrowEdge' }, eds)), []);

	const updateHandles = () => {
		const touchpoints = Array.from(document.querySelectorAll('.touchpoint'));
		const nodes = Array.from(document.querySelectorAll('.touchpoint-node'));
		if (!touchpoints.length || !nodes.length) {
			requestAnimationFrame(updateHandles);
			return;
		};
		const width = touchpoints[0].getBoundingClientRect().width;
		nodes.forEach((node) => {
			node.style.width = `${width}px`;
		});
	};

	useEffect(() => {
		const updateArrows = async () => {
			const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/map/arrow/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ arrows: edges }),
			});
			await response.json();
		};
		if (Array.from(document.querySelectorAll('.touchpoint-node')).length > 0) updateArrows();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [edges]);

	/* This is called only once at the very beginning */
	useEffect(() => {
		// load the entire map 
		const loadMap = async () => {
			const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/map/${id}`);
			const map = await response.json();
			setTitle(map.data.title);
			setQstColumns(map.data.qstColumns);
			setColumns(map.data.columns);
			const froms = map.data.froms;
			const tos = map.data.tos;
			setEdges(froms.map((e, i) => {
				return {
					id: `arrow${i}`,
					source: e,
					target: tos[i],
					type: 'arrowEdge',
				}
			}));
		};

		loadMap();
		requestAnimationFrame(updateNode);
		requestAnimationFrame(updateHandles);
		window.addEventListener('resize', updateHandles);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, refreshMap]);

	/* This is called whenever columns state change */
	useEffect(() => {
		// auto-update the database
		const updateColumns = async () => {
			const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/map/column/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(columns),
			});

			await response.json();
			updateHandles();
		};
		updateColumns();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [columns, id]);

	/* This is called whenever any state change */
	useEffect(() => {
		updateLastModified(id, new Date());
	}, [title, qstColumns, columns, edges, id]);

	/* This downloads the map as a png image */
	const mapRef = useRef(null);

	const downloadPDF = () => {
		html2canvas(mapRef.current).then((canvas) => {
		  const imgData = canvas.toDataURL("image/png");
		  const pdf = new jsPDF({
			orientation: canvas.width > canvas.height ? "l" : "p",
		  });
		  const pdfWidth = pdf.internal.pageSize.getWidth();
		  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
		  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
		  pdf.save("Developer Journey Map.pdf");
		});
	  };	  

	// const handleExport = () => {
	// 	html2canvas(mapRef.current).then(canvas => {
	// 	  const link = document.createElement('a');
	// 	  link.download = 'export.png';
	// 	  link.href = canvas.toDataURL();
	// 	  link.click();
	// 	});
	//   };

	/* This hides the export button when the screen's width is less than the screen's max width */
	const [showButton, setShowButton] = useState(true);

	useEffect(() => {
		const handleResize = () => {
			const { innerWidth, innerHeight } = window;

			if (innerWidth < window.screen.width) {
				setShowButton(false);
			} else {
				setShowButton(true);
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<>
			<Navbar user={user} />
			<div className="content">
				<div className="export">
					{showButton && <div className="exportButton" onClick={downloadPDF} >
						<img src={ExportIcon} alt="exportIcon" className="exportIcon" />
						Export
					</div>}
				</div>
				<div className="main" ref={mapRef}>
					<TouchPointModalInfo
						open={openModal}
						onClose={() => setOpenModal(false)}
						item={touchpointItem}
						onItemChange={setTouchpointItem}
						setOpenEDTPModal={setOpenEDTPModal}
						setEditDeleteTouchpointItem={setEditDeleteTouchpointItem}
						setOpenDelConfirmModal={setOpenDelConfirmModal}
						setDelConfirmTouchpointItem={setDelConfirmTouchpointItem} />
					<CreateTouchPointModal
						open={openCTPModal}
						onClose={() => setOpenCTPModal(false)}
						item={columnInfo}
						mapID={id}
						refreshMap={refreshMap}
						setRefreshMap={setRefreshMap} />
					<EditDeleteTouchPointModal
						open={openEDTPModal}
						onClose={() => setOpenEDTPModal(false)}
						item={editDeleteTouchpointItem}
						onItemChange={setEditDeleteTouchpointItem}
						mapID={id}
						refreshMap={refreshMap}
						setRefreshMap={setRefreshMap} />
					<DeleteConfirmationModal
						open={openDelConfirmModal}
						onClose={() => setOpenDelConfirmModal(false)}
						item={delConfirmTouchpointItem}
						onItemChange={setDelConfirmTouchpointItem}
						mapID={id}
						refreshMap={refreshMap}
						setRefreshMap={setRefreshMap} />
					<ViewTouchpointModal
						open={openViewModal}
						onClose={() => setOpenViewModal(false)}
						item={touchpointItem} />
					<ReactFlow
						nodes={nodes}
						onNodesChange={onNodesChange}
						nodeTypes={nodeTypes}
						edges={edges}
						edgeTypes={edgeTypes}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
						panOnDrag={false}
						zoomOnScroll={false}
						preventScrolling={false}
						autoPanOnConnect={false}
						autoPanOnNodeDrag={false}
						zoomOnDoubleClick={false}
						disableKeyboardA11y={true}
						zoomActivationKeyCode={null}
						panActivationKeyCode={null}
						selectionKeyCode={null}
						multiSelectionKeyCode={null}
						deleteKeyCode={'Delete'}
					>
						<DragDropContext
							onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
							{titleEditable ? (
								<input
									className="title"
									type="text"
									onBlur={handleTitleBlur}
									onChange={handleTitleChange}
									defaultValue={title}
									size={titleLength + 1}
									autoFocus
									required
								/>
							) : (
								<h2 className="title" onClick={handleTitleClick}>
									{title}
								</h2>
							)}

							<div id="grid-layout-map">
								<h3 className="heading-left heading-top-rounded">STAGE</h3>
								<h3 className="heading-top">DISCOVER</h3>
								<h3 className="heading-top">EVALUATE</h3>
								<h3 className="heading-top">LEARN</h3>
								<h3 className="heading-top">BUILD</h3>
								<h3 className="heading-top">SCALE</h3>

								<h3 className="heading-left">GOALS / NEEDS</h3>
								<div className="grid-cell">Is this of use to me?</div>
								<div className="grid-cell">Will it meet my needs?</div>
								<div className="grid-cell">How does it work?</div>
								<div className="grid-cell">Can I build a proof of concept?</div>
								<div className="grid-cell">Can I build to scale?</div>

								<h3 className="heading-left">QUESTIONS</h3>
								{qstColumns
									.sort((a, b) => a.qstColIndex - b.qstColIndex)
									.map(qstColumn => (
										<div className="grid-cell question-cell" key={qstColumn._id}>
											{qstColumn.questions
												.map((qst, index) => (
													<Question
														key={qst._id}
														qstColumn={qstColumn}
														qstColumnId={qstColumn._id}
														qst={qst}
														index={index}
													/>
												))
											}
											<button
												className="question-add-button"
												onClick={() => handleClickAdd(qstColumn._id, qstColumn.qstColIndex)}
											>
												+
											</button>
										</div>
									))
								}

								<h3 className="heading-left">INTERNAL TOUCHPOINTS</h3>
								{Object.entries(columns)
									.filter(([id, column]) => column.position === "internal")
									.map(([id, column]) => (
										<Column
											id={id}
											column={column}
											columns={columns}
											setColumns={setColumns}
											openModalWithItem={openModalWithItem}
											openViewModalWithItem={openViewModalWithItem}
											openCreateTouchpointModal={openCreateTouchpointModal}
											key={id}
										/>
									))
								}

								<h3 className="heading-left heading-bottom-rounded">EXTERNAL TOUCHPOINTS</h3>
								{Object.entries(columns)
									.filter(([id, column]) => column.position === "external")
									.map(([id, column]) => (
										<Column
											id={id}
											column={column}
											columns={columns}
											setColumns={setColumns}
											openModalWithItem={openModalWithItem}
											openViewModalWithItem={openViewModalWithItem}
											openCreateTouchpointModal={openCreateTouchpointModal}
											key={id}
										/>
									))
								}
							</div>
						</DragDropContext>
					</ReactFlow>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Map;