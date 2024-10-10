// frontend/src/components/TerminalManager.js
import React, { useContext } from 'react';
import { TerminalContext } from '../context/TerminalContext';
import TerminalComponent from './Terminal';

const TerminalManager = () => {
  const { terminals, addTerminal, removeTerminal } = useContext(TerminalContext);

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

