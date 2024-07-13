import React from 'react';
import { ControlType } from '../types';

interface NodeToolbarProps {
  onAddNode: (type: ControlType) => void;
}

const NodeToolbar: React.FC<NodeToolbarProps> = ({ onAddNode }) => {
  const nodeTypes: (ControlType | 'textAndDropdown')[] = ['text', 'textarea', 'dropdown', 'radio', 'checkbox', 'textAndDropdown'];

  return (
    <div className="w-48 bg-gray-200 p-4 border-r border-gray-300">
      <h2 className="text-lg font-semibold mb-4">Add Node</h2>
      <div className="space-y-2">
        {nodeTypes.map((type) => (
          <button
            key={type}
            onClick={() => onAddNode(type as ControlType)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {type === 'textAndDropdown' ? 'Text & Dropdown' : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NodeToolbar;