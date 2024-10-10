import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TerminalProvider from './context/TerminalContext';  // Ensure this path is correct

ReactDOM.render(
  <React.StrictMode>
    <TerminalProvider>  {/* Wrap the entire app with the provider */}
      <App />
    </TerminalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
