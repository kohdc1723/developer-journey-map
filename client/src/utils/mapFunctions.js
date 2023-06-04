// on drag handler
export const onDragEnd = (result, columns, setColumns) => {
    const { source, destination } = result;

    // if drag and drop to non-droppable area
    if (!result.destination) return;

    if (source.droppableId !== destination.droppableId) {
        // if drag and drop to different columns
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
            }
        });
    } else {
        // if drag and drop to the same column
        const sourceColumn = columns[source.droppableId];
        const copiedItems = [...sourceColumn.touchpoints];

        const [draggedItem] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, draggedItem);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                touchpoints: copiedItems,
            }
        });
    }
};

// update title
export const updateTitle = async (mapId, titleInput, setTitle) => {
    if (!titleInput) {
        return;
    }

    setTitle(titleInput);

    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/map/title/${mapId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: titleInput,
        }),
    });

    await response.json();
};

// update lastModified
export const updateLastModified = async (mapId, timestamp) => {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/map/timestamp/${mapId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            timestamp: timestamp
        })
    });

    await response.json();
};