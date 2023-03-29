import React from 'react';
import { getBezierPath } from 'reactflow';

const selectedColor = 'black';
const unselectedColor = 'grey';

const ArrowEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
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
        orient="auto-start-reverse"
        fill={selected ? selectedColor : unselectedColor}>
        <path d="M 0 0 L 10 5 L 00 10 z" />
      </marker>
      <path
        style={{stroke: "transparent", strokeWidth: 20 }}
        className="react-flow__edge-path-selector"
        d={edgePath}
        fillRule="evenodd"
      />
      <path
        id={id}
        style={{stroke: selected ? selectedColor : unselectedColor}}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd="url(#arrow)"
        fillRule="evenodd"
      />
    </>
  );
}


export default ArrowEdge;