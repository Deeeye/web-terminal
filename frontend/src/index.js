// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TerminalProvider from './context/TerminalContext'; // Wrap the app with the TerminalProvider

ReactDOM.render(
  <React.StrictMode>
    <TerminalProvider>
      <App />
    </TerminalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
