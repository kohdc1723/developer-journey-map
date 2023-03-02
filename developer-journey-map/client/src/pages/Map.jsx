import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "../components";
import "../assets/styles/map.css";

import ReactFlow, { useNodesState, useEdgesState, addEdge, } from 'reactflow';
import 'reactflow/dist/style.css';
import ArrowEdge from "../components/ArrowEdge";
import TouchpointNode from "../components/TouchpointNode";

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
  const { id } = useParams();
  const [title, setTitle] = useState("Title");
  const [titleEditable, setTitleEditable] = useState(false);
  const [columns, setColumns] = useState([]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const updateNode = useCallback(() => setNodes((ns) => {
    Array.from(document.querySelectorAll('.touchpoint, .touchpoint-on-dragging')).forEach((node) => {
      const id = node.id;
      const position = document.getElementById(id).getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const x = position.left - 20;
      const y = position.top + scrollTop - 75 + (position.height / 2);
      ns.push({id: `${id}`, type: 'touchpointNode', position: { x: x, y: y }});
    });
    return [...ns]
  }), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, type: 'arrowEdge' }, eds)), []);

  const handleTitleBlur = (e) => {
    e.preventDefault();
    const value = e.target.value.trim();
    
    if (!value) {
      setTitle("Title");
    } else {
      setTitle(e.target.value);
    }

    setTitleEditable(false);
  }

  const handleTitleClick = (e) => {
    setTitleEditable(true);
  }

  /* This is called only once at the very beginning */
  useEffect(() => {
    // load the entire map 
    const loadMap = async () => {
      const response = await fetch(`http://localhost:3800/api/map/${id}`);
      const map = await response.json();
      setTitle(map.data.title);
      setColumns(map.data.columns);
    };
    
    loadMap();
  }, [id]);

  useEffect(() => {
    const updateTitle = async () => {
      const response = await fetch(`http://localhost:3800/api/map/title/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title
        })
      })

      await response.json();
    }

    updateTitle();
  })

  /* This is called whenever columns state change */
  useEffect(() => {
    // auto-update the database
    const updateColumns = async () => {
      const response = await fetch(`http://localhost:3800/api/map/column/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(columns),
      });

      await response.json();
    };

    updateColumns();
  }, [columns, id]);

  /* This is called whenever any state change */
  useEffect(() => {
    // update lastModified in the database
    const updateTimestamp = async () => {
      const timestamp = { timestamp: new Date() };

      const response = await fetch(`http://localhost:3800/api/map/timestamp/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(timestamp)
      });
      await response.json();
      updateNode();
    }

    updateTimestamp();
  }, [columns]);

  return (
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
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {titleEditable ? (
          <input
            className="title"
            type="text"
            onBlur={handleTitleBlur}
            defaultValue={title}
            autoFocus
            required
          />
        ) : (
          <h2 className="title" onClick={handleTitleClick}>{title}</h2>
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
          <div className="grid-cell">
            <div>1. What is it?</div>
            <div>2. Could it solve my problem?</div>
            <div>3. Is it credible?</div>
          </div>
          <div className="grid-cell">
            <div>1. Does it look easy to use?</div>
            <div>2. Are there any red flags?</div>
            <div>3. Is pricing a barrier?</div>
          </div>
          <div className="grid-cell">
            <div>1. Time to "Hello World"</div>
            <div>2. Are the docs a good experience?</div>
            <div>3. Do I have confidence?</div>
            <div>4. Is there a community?</div>
          </div>
          <div className="grid-cell">
            <div>1. Speed to MVP</div>
            <div>2. Is the product a good experience?</div>
            <div>3. How do I get support?</div>
            <div>4. Is it value for money?</div>
          </div>
          <div className="grid-cell">
            <div>1. Can I do more?</div>
            <div>2. How do I give feedback?</div>
            <div>3. How can I contribute?</div>
            <div>4. Will the product grow with me?</div>
          </div>

          <h3 className="heading-left">INTERNAL TOUCHPOINTS</h3>
          {Object.entries(columns)
            .filter(([id, column]) => column.position === "internal")
            .map(([id, column]) => (
              <Column
                id={id}
                column={column}
                columns={columns}
                setColumns={setColumns}
                updateNode={updateNode}
                key={id}
              />
            ))}

          <h3 className="heading-left heading-bottom-rounded">EXTERNAL TOUCHPOINTS</h3>
          {Object.entries(columns)
            .filter(([id, column]) => column.position === "external")
            .map(([id, column]) => (
              <Column
                id={id}
                column={column}
                columns={columns}
                setColumns={setColumns}
                updateNode={updateNode}
                key={id}
              />
            ))}
        </div>
      </DragDropContext>
    </ReactFlow>
  );
};

export default Map;
