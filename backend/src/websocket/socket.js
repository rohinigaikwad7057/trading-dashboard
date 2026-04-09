const WebSocket = require("ws");

const tickers = ["AAPL", "TSLA", "BTC-USD"];

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  const getPrice = () => Number((Math.random() * 1000).toFixed(2));

  wss.on("connection", (ws) => {
    console.log("Client connected");

    const interval = setInterval(() => {
      const symbol =
        tickers[Math.floor(Math.random() * tickers.length)];

      const data = {
        symbol,
        price: getPrice(),
        time: new Date().toISOString(),
      };
      console.log(`Sending ${symbol}: ${data.price}`);

      ws.send(JSON.stringify(data));
    }, 1000);

    ws.on("close", () => {
      clearInterval(interval);
      console.log("Client disconnected");
    });
    ws.on("error", (err) => {
      console.error("WebSocket error:", err);
    });
  });
}

module.exports = setupWebSocket;