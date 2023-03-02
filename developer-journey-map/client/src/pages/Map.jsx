import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "../components";
import "../assets/styles/map.css";

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

  const [title, setTitle] = useState("Map");
  const [titleEditable, setTitleEditable] = useState(false);

  const [qstColumns, setQstColumns] = useState([]);
  const [columns, setColumns] = useState([]);

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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: value
      })
    });

    await response.json();

    setTitleEditable(false);
  }

  const handleTitleClick = (e) => {
    e.preventDefault();
    setTitleEditable(true);
  }

  /* This is called only once at the very beginning */
  useEffect(() => {
    // load the entire map 
    const loadMap = async () => {
      const response = await fetch(`http://localhost:3800/api/map/${id}`);
      const map = await response.json();
      setTitle(map.data.title);
      setQstColumns(map.data.qstColumns);
      setColumns(map.data.columns);
    };
    
    loadMap();
  }, [id]);

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
    }

    updateTimestamp();
  }, [columns, id]);

  return (
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
        {qstColumns
          .sort((a, b) => a.qstColIndex - b.qstColIndex)
          .map(qstColumn => (
            <div className="grid-cell" key={qstColumn._id}>
              {qstColumn.questions
                .sort((a, b) => a.qstIndex - b.qstIndex)
                .map((qst, index) => (
                  <div key={qst._id}>{`${index + 1}. ${qst.question}`}</div>
                ))
              }
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
              key={id}
            />
          ))
        }
      </div>
    </DragDropContext>
  );
};

export default Map;
