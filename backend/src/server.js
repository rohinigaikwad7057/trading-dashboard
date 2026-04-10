const express = require("express");
const cors = require("cors");
const http = require("http");

const app = require("./app");
const setupWebSocket = require("./websocket/socket");

const server = http.createServer(app);

//CHANGE: store wsService
const wsService = setupWebSocket(server);
app.locals.wsService = wsService;

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});