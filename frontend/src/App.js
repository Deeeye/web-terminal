// frontend/src/App.js
import React from 'react';
import './styles/App.css';
import TerminalManager from './components/TerminalManager';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DevOps Terminal</h1>
      </header>
      <TerminalManager />
    </div>
  );
}

export default App;
