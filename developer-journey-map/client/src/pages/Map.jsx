import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "../components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ArrowEdge from "../components/ArrowEdge";
import TouchpointNode from "../components/TouchpointNode";
import TouchPointModalInfo from "../components/TouchPointModalInfo";
import CreateTouchPointModal from "../components/CreateTouchPointModal";
import Question from "../components/Question";
import { createQuestion } from "../utils/questionFunctions.js";
import "reactflow/dist/style.css";
import "../index.css";
import "../assets/styles/map.css";

const nodeTypes = {
  touchpointNode: TouchpointNode,
};

const edgeTypes = {
  arrowEdge: ArrowEdge,
};

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
    const sourceColumn = columns[source.droppableId];
    const copiedItems = [...sourceColumn.touchpoints];

    const [draggedItem] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, draggedItem);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        touchpoints: copiedItems,
      },
    });
  }
};

const Map = () => {
  /* Define states */
  const [user, setUser] = useState(null);

  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [titleEditable, setTitleEditable] = useState(false);
  const [titleLength, setTitleLength] = useState(title.length);
  const handleTitleChange = (e) => {
    e.preventDefault();
    const newTitle = e.target.value.trim();
    const newTitleSize = newTitle.length;
    setTitle(newTitle);
    setTitleLength(newTitleSize);
  };

  const [qstColumns, setQstColumns] = useState([]);
  const [columns, setColumns] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [touchpointItem, setTouchpointItem] = useState({});

  const openModalWithItem = (item) => {
    setOpenModal(true);
    setTouchpointItem(item);
  };

  const handleClickAdd = async (questionColumnId, questionColumnIndex) => {
    const newQuestion = await createQuestion(id, questionColumnId);
    qstColumns[questionColumnIndex].questions.push(newQuestion);
    setQstColumns(qstColumns);
  };

  const [openCTPModal, setOpenCTPModal] = useState(false);
  const [columnInfo, setColumnInfo] = useState({});
  const openCreateTouchpointModal = (info) => {
    setOpenCTPModal(true);
    setColumnInfo(info);
  };
  const [dragging, setDragging] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const updateNode = useCallback(
    () =>
      setNodes((ns) => {
        ns = [];
        Array.from(document.querySelectorAll(".touchpoint")).forEach((node) => {
          const id = node.id;
          const position = document.getElementById(id).getBoundingClientRect();
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const x = position.left - 20;
          const y = position.top + scrollTop - 75 + position.height / 2;
          ns.push({
            id: `${id}`,
            type: "touchpointNode",
            position: { x: x, y: y },
          });
        });
        //console.log(dragging.valueOf());
        requestAnimationFrame(updateNode);
        return [...ns];
      }),
    []
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, type: "arrowEdge" }, eds)),
    []
  );

  const updateHandles = () => {
    const touchpoints = Array.from(document.querySelectorAll(".touchpoint"));
    const nodes = Array.from(document.querySelectorAll(".touchpoint-node"));
    if (!touchpoints.length || !nodes.length) {
      requestAnimationFrame(updateHandles);
      return;
    }
    const width = touchpoints[0].getBoundingClientRect().width;
    nodes.forEach((node) => {
      node.style.width = `${width}px`;
    });
  };

  const handleTitleBlur = async (e) => {
    e.preventDefault();
    const value = e.target.value.trim();

    if (!value) {
      setTitle("Title");
    } else {
      setTitle(value);
    }

    const response = await fetch(`http://localhost:3800/api/map/title/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: value,
      }),
    });

    await response.json();

    setTitleEditable(false);
  };

  const handleTitleClick = (e) => {
    e.preventDefault();
    setTitleEditable(true);
  };

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3800/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  /* This is called only once at the very beginning */
  useEffect(() => {
    // load the entire map
    const loadMap = async () => {
      const response = await fetch(`http://localhost:3800/api/map/${id}`);
      const map = await response.json();
      setTitle(map.data.title);
      setTitleLength(map.data.title.length);
      setQstColumns(map.data.qstColumns);
      setColumns(map.data.columns);
    };

    loadMap();
    requestAnimationFrame(updateNode);
    requestAnimationFrame(updateHandles);
    window.addEventListener("resize", updateHandles);
  }, [id]);

  /* This is called whenever columns state change */
  useEffect(() => {
    // auto-update the database
    const updateColumns = async () => {
      const response = await fetch(
        `http://localhost:3800/api/map/column/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(columns),
        }
      );

      await response.json();
      updateHandles();
    };
    updateColumns();
  }, [columns, id]);

  /* This is called whenever any state change */
  useEffect(() => {
    // update lastModified in the database
    const updateTimestamp = async () => {
      const timestamp = { timestamp: new Date() };

      const response = await fetch(
        `http://localhost:3800/api/map/timestamp/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(timestamp),
        }
      );
      await response.json();
    };
    updateTimestamp();
  }, [columns, id]);

  return (
    <>
      <Navbar user={user} />
      <div className="main">
        <TouchPointModalInfo
          open={openModal}
          onClose={() => setOpenModal(false)}
          item={touchpointItem}
          onItemChange={setTouchpointItem}
        />
        <CreateTouchPointModal
          open={openCTPModal}
          onClose={() => setOpenCTPModal(false)}
          item={columnInfo}
          onItemChange={setColumnInfo}
        />
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
          deleteKeyCode={null}
        >
          <DragDropContext
            onDragStart={() => {
              console.log("drag start");
              setDragging(true);
            }}
            onDragEnd={(result) => {
              console.log("drag end");
              setDragging(false);
              onDragEnd(result, columns, setColumns);
            }}
          >
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
                .map((qstColumn) => (
                  <div className="grid-cell question-cell" key={qstColumn._id}>
                    {qstColumn.questions
                      .sort((a, b) => a.qstIndex - b.qstIndex)
                      .map((qst, index) => (
                        <Question
                          key={qst._id}
                          qstColumn={qstColumn}
                          qstColumnId={qstColumn._id}
                          qst={qst}
                          index={index}
                        />
                      ))}
                    <button
                      className="question-add-button"
                      onClick={() => handleClickAdd(qstColumn._id, qstColumn.qstColIndex)}
                    >
                      +
                    </button>
                  </div>
                ))}

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
                    openCreateTouchpointModal={openCreateTouchpointModal}
                    key={id}
                  />
                ))}

              <h3 className="heading-left heading-bottom-rounded">
                EXTERNAL TOUCHPOINTS
              </h3>
              {Object.entries(columns)
                .filter(([id, column]) => column.position === "external")
                .map(([id, column]) => (
                  <Column
                    id={id}
                    column={column}
                    columns={columns}
                    setColumns={setColumns}
                    openModalWithItem={openModalWithItem}
                    openCreateTouchpointModal={openCreateTouchpointModal}
                    key={id}
                  />
                ))}
            </div>
          </DragDropContext>
        </ReactFlow>
      </div>
      <Footer />
    </>
  );
};

export default Map;
