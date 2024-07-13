import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeData } from '../types';
import { Card } from 'primereact/card';

const CustomNode: React.FC<NodeProps<NodeData>> = ({ data, isConnectable }) => {
  const renderControl = (control: NodeData['controls'][0], index: number) => {
    switch (control.type) {
      case 'text':
        return (
          <input
            type="text"
            className="w-full px-2 py-1 border rounded"
            placeholder={control.placeholder}
            value={control.value as string}
            onChange={(e) => data.onControlChange(index, e.target.value)}
          />
        );
      case 'dropdown':
        return (
          <select
            className="w-full px-2 py-1 border rounded"
            value={control.value as string}
            onChange={(e) => data.onControlChange(index, e.target.value)}
          >
            {control.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={control.value as boolean}
              onChange={(e) => data.onControlChange(index, e.target.checked)}
              className="mr-2"
            />
            {control.label}
          </label>
        );
      case 'textarea':
        return (
          <textarea
            className="w-full px-2 py-1 border rounded"
            placeholder={control.placeholder}
            value={control.value as string}
            onChange={(e) => data.onControlChange(index, e.target.value)}
            rows={3}
          />
        );
      case 'radio':
        return (
          <div>
            {control.options?.map((option) => (
              <label key={option.value} className="flex items-center mr-4">
                <input
                  type="radio"
                  value={option.value}
                  checked={control.value === option.value}
                  onChange={() => data.onControlChange(index, option.value)}
                  className="mr-1"
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="custom-node" title={data.label}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      {data.controls.map((control, index) => (
        <div key={index} className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {control.label}
          </label>
          {renderControl(control, index)}
        </div>
      ))}
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </Card>
  );
};

export default memo(CustomNode);