import React, { useContext } from 'react';
import { TerminalContext } from '../context/TerminalContext'; // Ensure correct path
import TerminalComponent from './Terminal';

const TerminalManager = () => {
  const { terminals, addTerminal, removeTerminal } = useContext(TerminalContext);

  if (!terminals) {
    return <div>Error: Terminals not found</div>;  // Add this for debugging purposes
  }

  const handleAddTerminal = () => {
    const newTerminal = {
      id: terminals.length + 1,
      host: 'localhost',
      username: 'user',
      password: 'pass',
    };
    addTerminal(newTerminal);
  };

  return (
    <div className="terminal-manager">
      <button onClick={handleAddTerminal}>Add Terminal</button>
      <div className="terminals">
        {terminals.map((term) => (
          <TerminalComponent
            key={term.id}
            id={term.id}
            host={term.host}
            username={term.username}
            password={term.password}
            onClose={() => removeTerminal(term.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TerminalManager;
