import React from 'react';
import { Node } from 'reactflow';
import { CustomNodeData, ControlConfig } from '../types';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';

interface ConfigPanelProps {
  selectedNode: Node<CustomNodeData> | null;
  onUpdateNode: (id: string, newData: CustomNodeData) => void;
  onDeleteNode: (id: string) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ selectedNode, onUpdateNode, onDeleteNode }) => {
  if (!selectedNode) {
    return (
      <Panel header="Configuration" className="config-panel">
        <p className="p-text-secondary">Select a node to configure</p>
      </Panel>
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
      <div key={index} className="p-field">
        <label htmlFor={`control-label-${index}`} className="p-d-block">Label</label>
        <InputText
          id={`control-label-${index}`}
          value={control.label}
          onChange={(e) => handleLabelChange(index, e.target.value)}
          className="p-d-block"
        />
        <label htmlFor={`control-value-${index}`} className="p-d-block">Value</label>
        {control.type === 'checkbox' ? (
          <Checkbox
            inputId={`control-value-${index}`}
            checked={control.value as boolean}
            onChange={(e: CheckboxChangeEvent) => {
              if (e.checked !== undefined) {
                handleValueChange(index, e.checked);
              }
            }}
          />
        ) : control.type === 'dropdown' ? (
          <Dropdown
            id={`control-value-${index}`}
            value={control.value as string}
            options={control.options}
            onChange={(e: DropdownChangeEvent) => handleValueChange(index, e.value)}
            className="p-d-block"
          />
        ) : (
          <InputText
            id={`control-value-${index}`}
            value={control.value as string}
            onChange={(e) => handleValueChange(index, e.target.value)}
            className="p-d-block"
          />
        )}
        <Divider />
      </div>
    );
  };

  return (
    <Panel header="Node Configuration" className="config-panel p-shadow-2">
      <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
        <InputText
          value={selectedNode.data.label}
          onChange={(e) => onUpdateNode(selectedNode.id, { ...selectedNode.data, label: e.target.value })}
          placeholder="Node Label"
          className="p-mr-2"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-danger p-button-rounded"
          onClick={() => onDeleteNode(selectedNode.id)}
          tooltip="Delete Node"
        />
      </div>
      <Divider />
      <h3 className="p-text-secondary p-mb-2">Controls</h3>
      {selectedNode.data.controls.map(renderControlConfig)}
    </Panel>
  );
};

export default ConfigPanel;