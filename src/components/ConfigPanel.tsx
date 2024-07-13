import React from 'react';
import { Node } from 'reactflow';
import { CustomNodeData, ControlConfig } from '../types';
import { Trash2 } from 'lucide-react'; // Import the trash icon

interface ConfigPanelProps {
  selectedNode: Node<CustomNodeData> | null;
  onUpdateNode: (id: string, newData: CustomNodeData) => void;
  onDeleteNode: (id: string) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ selectedNode, onUpdateNode, onDeleteNode }) => {
  if (!selectedNode) {
    return (
      <div className="w-80 bg-gray-100 p-4 border-l border-gray-300">
        <p className="text-gray-500">Select a node to configure</p>
      </div>
    );
  }

  const handleLabelChange = (controlIndex: number, newLabel: string) => {
    const updatedControls = selectedNode.data.controls.map((control, index) => 
      index === controlIndex ? { ...control, label: newLabel } : control
    );
    onUpdateNode(selectedNode.id, { ...selectedNode.data, controls: updatedControls });
  };

  const handleValueChange = (controlIndex: number, newValue: string | boolean) => {
    const updatedControls = selectedNode.data.controls.map((control, index) => 
      index === controlIndex ? { ...control, value: newValue } : control
    );
    onUpdateNode(selectedNode.id, { ...selectedNode.data, controls: updatedControls });
  };

  const renderControlConfig = (control: ControlConfig, index: number) => {
    return (
      <div key={index} className="mb-4 p-4 bg-white rounded shadow">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            className="w-full px-2 py-1 border rounded focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={control.label}
            onChange={(e) => handleLabelChange(index, e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Value
          </label>
          {control.type === 'checkbox' ? (
            <input
              type="checkbox"
              checked={control.value as boolean}
              onChange={(e) => handleValueChange(index, e.target.checked)}
              className="form-checkbox text-primary focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          ) : control.type === 'dropdown' ? (
            <select
              className="w-full px-2 py-1 border rounded focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={control.value as string}
              onChange={(e) => handleValueChange(index, e.target.value)}
            >
              {control.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              className="w-full px-2 py-1 border rounded focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={control.value as string}
              onChange={(e) => handleValueChange(index, e.target.value)}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-80 bg-gray-100 p-4 border-l border-gray-300 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-primary">Node Configuration</h2>
        <button
          onClick={() => onDeleteNode(selectedNode.id)}
          className="text-red-500 hover:text-red-700 focus:outline-none"
          title="Delete Node"
        >
          <Trash2 size={20} />
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Node Label
        </label>
        <input
          type="text"
          className="w-full px-2 py-1 border rounded focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          value={selectedNode.data.label}
          onChange={(e) => onUpdateNode(selectedNode.id, { ...selectedNode.data, label: e.target.value })}
        />
      </div>
      <h3 className="text-md font-semibold mb-2 text-primary">Controls</h3>
      {selectedNode.data.controls.map(renderControlConfig)}
    </div>
  );
};

export default ConfigPanel;