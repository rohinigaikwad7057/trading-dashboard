const express = require("express");
const cors = require("cors");
const http = require("http");

const tickerRoutes = require("./routes/tickerRoutes");
const setupWebSocket = require("./websocket/socket");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Trading Dashboard Backend Running");
});

// API routes
app.use("/api", tickerRoutes);

// Create HTTP server
const server = http.createServer(app);
// Attach WebSocket
setupWebSocket(server);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});