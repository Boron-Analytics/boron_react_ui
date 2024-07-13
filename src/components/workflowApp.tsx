import React, { useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useReactFlow, Node, useNodesState, useEdgesState, Connection } from 'reactflow';
import 'reactflow/dist/style.css';

import { saveWorkflow, loadWorkflow } from '../utils/workflowUtils';
import { ControlType, CustomNodeData, NodeData } from '../types';
import CustomNode from './CustomNode';
import ConfigPanel from './ConfigPanel';
import AppBar from './AppBar';
import NodeToolbar from './NodeToolbar';
import { Edge } from 'react-flow-renderer';

const nodeTypes = {
  customNode: CustomNode,
};

const WorkflowApp: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = React.useState<Node<CustomNodeData> | null>(null);

  const { project } = useReactFlow();

  const onSave = useCallback(() => {
    saveWorkflow({ nodes, edges });
    alert('Workflow saved successfully!');
  }, [nodes, edges]);

  const onLoad = useCallback(() => {
    const flow = loadWorkflow();
    if (flow) {
      setNodes(flow.nodes);
      setEdges(flow.edges);
      alert('Workflow loaded successfully!');
    } else {
      alert('No saved workflow found.');
    }
  }, [setNodes, setEdges]);

  
  const onAddNode = useCallback((type: ControlType) => {
    let newNode: CustomNodeData;

    if (type === 'textAndDropdown') {
      newNode = {
        label: 'Text and Dropdown Node',
        controls: [
          { type: 'text', label: 'Text Input', value: '' },
          { 
            type: 'dropdown', 
            label: 'Dropdown', 
            value: 'option1',
            options: [
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ]
          }
        ],
      };
    } else {
      newNode = {
        label: `New ${type} Node`,
        controls: [{ type, label: type, value: '' }],
      };
    }

    const position = project({ x: 100, y: 100 });

    setNodes((nds) => nds.concat({
      id: `${type}-${nds.length + 1}`,
      type: 'customNode',
      position,
      data: newNode,
    }));
  }, [project, setNodes]);

   const onControlChange = useCallback((nodeId: string, controlIndex: number, value: string | boolean) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          const newControls = [...node.data.controls];
          newControls[controlIndex] = { ...newControls[controlIndex], value };
          return { ...node, data: { ...node.data, controls: newControls } };
        }
        return node;
      })
    );
  }, []);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node<CustomNodeData>) => {
    setSelectedNode(node);
  }, []);

  const updateNode = useCallback((id: string, newData: CustomNodeData) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, data: newData } : node))
    );
  }, [setNodes]);

  const onDeleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    setSelectedNode(null);
  }, [setNodes, setEdges]);

  const nodesWithOnChange: Node<NodeData>[] = React.useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onControlChange: (controlIndex: number, value: string | boolean) =>
          onControlChange(node.id, controlIndex, value),
      },
    }));
  }, [nodes, onControlChange]);

   const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  const addEdge = (params: any, edges: Edge[]) => {
    const newEdge = {
      id: `e${params.source}-${params.target}`,
      source: params.source,
      target: params.target
    };
    return [...edges, newEdge];
  };


  return (
    <div className="h-screen">
      <AppBar onSave={onSave} onLoad={onLoad} />
      <div className="flex-1 flex">
        <NodeToolbar onAddNode={onAddNode} />
        <div className="flex-1" style={{ height: 800 }}>
          <ReactFlow
            nodes={nodesWithOnChange}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
        <ConfigPanel 
          selectedNode={selectedNode} 
          onUpdateNode={updateNode}
          onDeleteNode={onDeleteNode}
        />
      </div>
    </div>
  );
};

export default WorkflowApp;