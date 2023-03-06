import { Handle, Position } from 'reactflow';

function TouchpointNode({ data, isConnectable }) {

  return (
    <div className="touchpoint-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
    </div>
  );
}

export default TouchpointNode;
