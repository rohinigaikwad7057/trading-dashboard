const express = require("express");
const cors = require("cors");
const tickerRoutes = require("./routes/tickerRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Trading Dashboard Backend Running");
});

// API routes
app.use("/api", tickerRoutes);

// Export app for testing 
// This allows testing APIs without starting the server
module.exports = app;