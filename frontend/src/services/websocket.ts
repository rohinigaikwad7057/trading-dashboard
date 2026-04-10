export type PriceData = {
  symbol: string;
  price: string;
};

export type AlertData = {
  type: "priceAlert";
  symbol: string;
  price: number;
  target: number;
};

let socket: WebSocket | null = null;

export const connectSocket = (
  onMessage: (data: PriceData) => void,
  onAlert?: (data: AlertData) => void 
): WebSocket => {

  socket = new WebSocket("ws://localhost:3001");

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
    socket = null;
  };

  socket.onerror = (error) => {
    console.error("WebSocket error", error);
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      // NORMAL PRICE
      if (data.type === "priceUpdate") {
        onMessage(data);
      }

      // ALERT
      if (data.type === "priceAlert") {
        console.log("ALERT RECEIVED:", data);
        if (onAlert) {
          onAlert(data); 
        } else {
          alert(` ${data.symbol} reached ${data.price} (Target: ${data.target})`);
        }
      }

    } catch (err) {
      console.error("Invalid data received", err);
    }
  };

  return socket;
};