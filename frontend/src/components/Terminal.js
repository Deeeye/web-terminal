// frontend/src/components/Terminal.js

import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { FitAddon } from 'xterm-addon-fit';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const TerminalComponent = ({ id, host, username, password, onClose }) => {
  const terminalRef = useRef(null);
  const [maximized, setMaximized] = useState(false);
  const term = new Terminal();
  const fitAddon = new FitAddon();

  useEffect(() => {
    // Use fallback URL if REACT_APP_WS_URL is not set or is undefined
    const socketUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:3001/ws';
    console.log('WebSocket URL:', socketUrl); // Log the WebSocket URL to ensure it's correct

    const socket = new WebSocket(socketUrl);

    // Event: WebSocket connection successfully opened
    socket.onopen = () => {
      console.log('WebSocket connection established successfully');
      socket.send(JSON.stringify({ type: 'connect', data: { host, username, password } }));
    };

    // Event: WebSocket message received
    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        console.log('Received message:', msg); // Log received message for debugging

        if (msg.type === 'data') {
          term.write(msg.data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    // Event: WebSocket error
    socket.onerror = (error) => {
      console.error('WebSocket encountered an error:', error);
    };

    // Event: WebSocket connection closed
    socket.onclose = (event) => {
      console.warn('WebSocket connection closed:', event.reason);
    };

    // Event: Handle terminal input
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    // Event: Send data to WebSocket when the user types in the terminal
    term.onData((data) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'command', data }));
      } else {
        console.error('WebSocket is not open. Cannot send data:', data);
      }
    });

    // Cleanup function when component is unmounted
    return () => {
      socket.close(); // Close WebSocket connection
      term.dispose(); // Dispose terminal instance
    };
  }, [term, host, username, password]);

  const toggleMaximize = () => {
    setMaximized(!maximized);
  };

  return (
    <Draggable handle=".terminal-header">
      <div className={`terminal-window ${maximized ? 'maximized' : ''}`}>
        <div className="terminal-header">
          <span>Terminal - {id}</span>
          <button onClick={toggleMaximize}>{maximized ? 'Restore' : 'Maximize'}</button>
          <button onClick={onClose}>Close</button>
        </div>
        <ResizableBox width={400} height={300} className="terminal-box">
          <div ref={terminalRef} style={{ width: '100%', height: '100%' }}></div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default TerminalComponent;

