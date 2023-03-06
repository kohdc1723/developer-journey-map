import React from 'react';
import { getBezierPath } from 'reactflow';

const ArrowEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = { stroke: "grey" },
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5"
        markerWidth="12" markerHeight="12"
        orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 00 10 z" /* stroke="red" */ />
      </marker>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd="url(#arrow)"
      />
    </>
  );
}


export default ArrowEdge;