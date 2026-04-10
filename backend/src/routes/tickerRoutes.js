const express = require("express");
const router = express.Router();
// Mock tickers
const tickers = ["AAPL", "TSLA", "BTC-USD"];
// GET all tickers
router.get("/tickers", (req, res) => {
  res.json(tickers);
});


router.get("/history", (req, res) => {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ message: "Symbol is required" });
  }

  const history = [];
 const now = Date.now();

  for (let i = 20; i > 0; i--) {
    history.push({
      time: new Date(now - i * 60000).toLocaleTimeString(),
      price: Number((Math.random() * 1000).toFixed(2)),
      symbol,
    });
  }

  res.json(history);
});

//NEW ALERT ROUTE
router.post("/alert", (req, res) => {
  const { symbol, targetPrice } = req.body;

  if (!symbol || !targetPrice) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const wsService = req.app.locals.wsService;

  const alerts = wsService.getAlerts();

  alerts.push({
    symbol,
    targetPrice: Number(targetPrice),
  });

  wsService.setAlerts(alerts);

  res.json({ message: "Alert added successfully" });
});

module.exports = router;