const express = require('express');
const { Server } = require('ws');
const { Client } = require('ssh2');
const cors = require('cors');
const config = require('./config/config');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
const port = config.port;

// Serve frontend if deployed together (optional)
app.use(express.static('public'));

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
        console.log('SSH connection established');
        conn.shell((err, stream) => {
          if (err) {
            console.error('Error starting shell:', err);
            return ws.send(JSON.stringify({ type: 'error', data: err.message }));
          }

          shell = stream;
          stream.on('data', (chunk) => {
            ws.send(JSON.stringify({ type: 'data', data: chunk.toString('utf-8') }));
          });
        });
      }).connect({
        host: data.host || config.ssh.host,
        port: data.port || config.ssh.port,
        username: data.username || config.ssh.username,
        password: data.password || config.ssh.password,
      });

      conn.on('error', (err) => {
        console.error('SSH Connection Error:', err);
        ws.send(JSON.stringify({ type: 'error', data: `SSH Connection Error: ${err.message}` }));
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
