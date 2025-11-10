import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './adapters/ui/App';
import './styles.css'; // Import global styles (includes TailwindCSS)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);