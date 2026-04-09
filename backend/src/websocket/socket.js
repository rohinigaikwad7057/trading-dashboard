const WebSocket = require("ws");

const tickers = ["AAPL", "TSLA", "BTC-USD"];

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  const getPrice = () => (Math.random() * 1000).toFixed(2);

  wss.on("connection", (ws) => {
    console.log("Client connected");

    const interval = setInterval(() => {
      const symbol =
        tickers[Math.floor(Math.random() * tickers.length)];

      const data = {
        symbol,
        price: getPrice(),
      };

      ws.send(JSON.stringify(data));
    }, 1000);

    ws.on("close", () => {
      clearInterval(interval);
      console.log("Client disconnected");
    });
  });
}

module.exports = setupWebSocket;