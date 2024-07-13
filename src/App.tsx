import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { PrimeReactProvider } from 'primereact/api';
import WorkflowApp from './components/workflowApp';

// Import ReactFlow styles
import 'reactflow/dist/style.css';

// Import PrimeReact styles
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Import your custom styles
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <PrimeReactProvider>
      <ReactFlowProvider>
        <div className="App h-screen">
          <WorkflowApp />
        </div>
      </ReactFlowProvider>
    </PrimeReactProvider>
  );
};

export default App;