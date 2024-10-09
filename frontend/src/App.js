import React from 'react';
import './App.css';
import TerminalProvider from './context/TerminalContext';
import TerminalManager from './components/TerminalManager';

function App() {
  return (
    <TerminalProvider>
      <div className="App">
        <h1>Web Terminal Application</h1>
        <TerminalManager />
      </div>
    </TerminalProvider>
  );
}

export default App;

