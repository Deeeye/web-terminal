// frontend/src/App.js
import React from 'react';
import './styles/App.css';
import TerminalManager from './components/TerminalManager'; // Import the TerminalManager component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DevOps Terminal</h1>
      </header>
      <TerminalManager /> {/* Display the TerminalManager component */}
    </div>
  );
}

export default App;
