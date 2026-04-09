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

  socket.onmessage = (event) => {
    const data: PriceData = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return socket;
};