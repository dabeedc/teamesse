const { WebSocket, WebSocketServer } = require("ws");
const { v4: uuid } = require("uuid");
const axios = require("axios");

// https://www.reddit.com/r/bashonubuntuonwindows/comments/lvyret/connecting_to_a_websocket_server_from_wsl_2/
const wss = new WebSocketServer({ port: 8080, host: "0.0.0.0", path: "/math" });

const getStats = async (client) => {
  const { data } = await axios("http://localhost:3001/stats");
  client.send(JSON.stringify(data));
};

const broadcast = (msg) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
};

wss.on("connection", (ws) => {
  ws.id = uuid();
  broadcast(`New user joined. Active users: ${wss.clients.size}`);
  getStats(ws);

  ws.on("message", (data) => {
    broadcast(`${ws.id} says: ${data}`);
  });

  ws.on("close", () => {
    broadcast(`User left. Active users: ${wss.clients.size}`);
  });
});

// const express = require("express");
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

// server.listen(3002, "0.0.0.0", () => {
//   console.log("listening on *:3002");
// });
