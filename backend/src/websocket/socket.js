const WebSocket = require("ws");

const tickers = ["AAPL", "TSLA", "BTC-USD"];

// NEW: store alerts
let alerts = [];

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  const getPrice = () => Number((Math.random() * 1000).toFixed(2));

  wss.on("connection", (ws) => {
    console.log("Client connected");

    const interval = setInterval(() => {
      tickers.forEach((symbol) => {
        const currentPrice = getPrice();

        ws.send(
          JSON.stringify({
            type: "priceUpdate",
            symbol,
            price: currentPrice,
          })
        );

        alerts.forEach((alert, index) => {
          if (
            alert.symbol === symbol &&
            currentPrice >= alert.targetPrice
          ) {
            ws.send(
              JSON.stringify({
                type: "priceAlert",
                symbol,
                price: currentPrice,
                target: alert.targetPrice,
              })
            );

            console.log("Alert triggered:", alert);

            // remove after trigger
            alerts.splice(index, 1);
          }
        });
      });
    }, 1000);

    ws.on("close", () => {
      clearInterval(interval);
      console.log("Client disconnected");
    });

    ws.on("error", (err) => {
      console.error("WebSocket error:", err);
    });
  });

  //expose alert methods
  return {
    getAlerts: () => alerts,
    setAlerts: (newAlerts) => {
      alerts = newAlerts;
    },
  };
}

module.exports = setupWebSocket;