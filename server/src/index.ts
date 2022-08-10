import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 8082 });

type Chat = {
  userId: string;
  message: string;
};

const chatBoard: Chat[] = [];

wss.on("connection", (ws) => {
  ws.on("message", (payload) => {
    if (typeof payload === "string") {
      chatBoard.push(JSON.parse(payload));
    }

    wss.clients.forEach((client) => {
      client.send(JSON.stringify(chatBoard));
    });
  });

  ws.send(JSON.stringify(chatBoard));
});
