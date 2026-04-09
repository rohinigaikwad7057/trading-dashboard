export type PriceData = {
  symbol: string;
  price: string;
};

let socket: WebSocket | null = null;

export const connectSocket = (
  onMessage: (data: PriceData) => void
): WebSocket => {
    socket = new WebSocket("ws://localhost:3000");

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
      const data: PriceData = JSON.parse(event.data);
      onMessage(data);
    } catch (err) {
      console.error("Invalid data received", err);
    }
  };

  return socket;
};