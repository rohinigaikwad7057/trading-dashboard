const express = require("express");
const cors = require("cors");
const http = require("http");

const tickerRoutes = require("./routes/tickerRoutes");
const setupWebSocket = require("./websocket/socket");

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", tickerRoutes);


const server = http.createServer(app);

setupWebSocket(server);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});