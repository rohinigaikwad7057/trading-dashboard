const express = require("express");
const cors = require("cors");
const http = require("http");

const http = require("http");
const app = require("./app");
const setupWebSocket = require("./websocket/socket");

// Create HTTP server
const server = http.createServer(app);
// Attach WebSocket
setupWebSocket(server);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});