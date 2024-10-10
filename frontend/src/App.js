// TerminalContext.js
import React, { createContext, useState } from 'react';

export const TerminalContext = createContext();

const TerminalProvider = ({ children }) => {
  const [terminals, setTerminals] = useState([]);
  const [activeTerminal, setActiveTerminal] = useState(null);

  const addTerminal = (terminal) => {
    setTerminals([...terminals, terminal]);
  };

  const removeTerminal = (id) => {
    setTerminals(terminals.filter((term) => term.id !== id));
  };

  return (
    <TerminalContext.Provider value={{ terminals, addTerminal, removeTerminal, activeTerminal, setActiveTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalProvider;
