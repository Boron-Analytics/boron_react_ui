import React from 'react';
import { ControlType } from '../types';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

interface NodeToolbarProps {
  onAddNode: (type: ControlType) => void;
}

const getNodeIcon = (type: ControlType | 'textAndDropdown') => {
  switch(type) {
    case 'text': return 'pi pi-pencil';
    case 'textarea': return 'pi pi-align-left';
    case 'dropdown': return 'pi pi-chevron-down';
    case 'radio': return 'pi pi-circle-on';
    case 'checkbox': return 'pi pi-check-square';
    case 'textAndDropdown': return 'pi pi-list';
    default: return 'pi pi-plus';
  }
};

const NodeToolbar: React.FC<NodeToolbarProps> = ({ onAddNode }) => {
  const nodeTypes: (ControlType | 'textAndDropdown')[] = ['text', 'textarea', 'dropdown', 'radio', 'checkbox', 'textAndDropdown'];

  return (
    <Card className="node-toolbar p-shadow-2">
      <div className="p-card-title">Add Node</div>
      <Divider />
      <div className="p-fluid p-grid p-formgrid">
        {nodeTypes.map((type) => (
          <div key={type} className="p-field p-col-12 py-3">
            <Button
              className="p-button-outlined p-button-secondary"
              icon={getNodeIcon(type)}
              onClick={() => onAddNode(type as ControlType)}
              label={type === 'textAndDropdown' ? 'Text & Dropdown' : type.charAt(0).toUpperCase() + type.slice(1)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NodeToolbar;