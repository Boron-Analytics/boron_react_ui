import { WorkflowState } from '../types';

export function saveWorkflow(state: WorkflowState): void {
  const json = JSON.stringify(state);
  localStorage.setItem('workflow', json);
}

export function loadWorkflow(): WorkflowState | null {
  const json = localStorage.getItem('workflow');
  if (json) {
    return JSON.parse(json) as WorkflowState;
  }
  return null;
}