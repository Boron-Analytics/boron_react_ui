import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api';
import App from './App.tsx'

// Import PrimeReact styles
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// Import your preferred theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

// Import your custom styles
import './styles/main.scss'

const value = {
  ripple: true,
  inputStyle: 'outlined',
  ptOptions: { mergeSections: true, mergeProps: true }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>,
)