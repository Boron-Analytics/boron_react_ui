import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import WorkflowApp from './components/workflowApp';

const App: React.FC = () => {
  return (
    <ReactFlowProvider>
      <div className="App h-screen">
        <WorkflowApp />
      </div>
    </ReactFlowProvider>
  );
};

export default App;