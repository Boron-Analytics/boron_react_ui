import { Node, Edge } from 'reactflow';

export interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
}

export type ControlType = 'text' | 'textarea' | 'dropdown' | 'radio' | 'checkbox' | 'textAndDropdown';

export interface ControlConfig {
  type: ControlType;
  label: string;
  value: string | boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export interface CustomNodeData {
  label: string;
  controls: ControlConfig[];
}

export interface NodeData extends CustomNodeData {
  onControlChange: (controlIndex: number, value: string | boolean) => void;
}