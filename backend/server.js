const express = require('express');
const { Server } = require('ws');
const { Client } = require('ssh2');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

// Root route
app.get('/', (req, res) => {
  res.send('<h1>Backend Server Running</h1><p>This is the root route. WebSocket is available for SSH connections.</p>');
});

const server = app.listen(port, () => {
  console.log(`Backend server started on http://localhost:${port}`);
});

// WebSocket server for handling SSH connections
const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');

  const conn = new Client();
  let shell;

  ws.on('message', (message) => {
    const msg = JSON.parse(message);
    const { type, data } = msg;

    if (type === 'connect') {
      // Establish SSH connection
      conn.on('ready', () => {
        conn.shell((err, stream) => {
          if (err) return ws.send(JSON.stringify({ type: 'error', data: err.message }));

          shell = stream;
          stream.on('data', (chunk) => ws.send(JSON.stringify({ type: 'data', data: chunk.toString('utf-8') })));
        });
      }).connect({
        host: data.host || process.env.SSH_HOST,
        port: data.port || process.env.SSH_PORT,
        username: data.username || process.env.SSH_USERNAME,
        password: data.password || process.env.SSH_PASSWORD,
      });
    } else if (type === 'command' && shell) {
      // Send command to SSH shell
      shell.write(data);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    if (shell) shell.end();
    conn.end();
  });
});
