const express = require("express");
const router = express.Router();
const tickers = ["AAPL", "TSLA", "BTC-USD"];

router.get("/tickers", (req, res) => {
  res.json(tickers);
});


router.get("/history", (req, res) => {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ message: "Symbol is required" });
  }

  const history = [];

  for (let i = 0; i < 20; i++) {
    history.push({
      time: `10:${i}`,
      price: (Math.random() * 1000).toFixed(2),
      symbol,
    });
  }

  res.json(history);
});

module.exports = router;