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
    // Dynamically construct the WebSocket URL based on the current window location
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.hostname}/ws`;
    console.log('WebSocket URL:', wsUrl);  // Log to verify the WebSocket URL

    const socket = new WebSocket(wsUrl);

    // WebSocket event handling
    socket.onopen = () => {
      console.log('WebSocket connection established successfully');
      socket.send(JSON.stringify({ type: 'connect', data: { host, username, password } }));
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'data') {
        term.write(msg.data);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket encountered an error:', error);
    };

    socket.onclose = (event) => {
      console.warn('WebSocket connection closed:', event.reason);
    };

    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    term.onData((data) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'command', data }));
      } else {
        console.error('WebSocket is not open. Cannot send data:', data);
      }
    });

    return () => {
      socket.close();
      term.dispose();
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


