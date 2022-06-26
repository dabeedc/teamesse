const { WebSocket, WebSocketServer } = require("ws");
const axios = require("axios");

// https://www.reddit.com/r/bashonubuntuonwindows/comments/lvyret/connecting_to_a_websocket_server_from_wsl_2/
const wss = new WebSocketServer({ port: 8080, host: "0.0.0.0" });

const subjects = {
  math: [],
  compsci: [],
  english: [],
};

const broadcast = (subject, msg) => {
  subjects[subject].forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
};

const getParams = (path) =>
  path.split("/")[1].toLowerCase().split("?username=");

const connectToRoom = (subject, ws) => {
  if (subject in subjects) {
    subjects[subject].push(ws);
  } else {
    throw new Error(`${subject} not a valid subject`);
  }
};

wss.on("connection", (ws, req) => {
  const [subject, username] = getParams(req.url);
  ws.id = username;

  try {
    connectToRoom(subject, ws);
  } catch (err) {
    console.error(err);
    ws.close();
  }

  broadcast(
    subject,
    `${ws.id} joined. Active users: ${subjects[subject].length}`
  );

  ws.on("message", (data) => {
    broadcast(subject, `${ws.id} says: ${data}`);
  });

  ws.on("close", () => {
    subjects[subject] = subjects[subject].filter(
      (client) => client.id !== ws.id
    );
    broadcast(
      subject,
      `${ws.id} left. Active users: ${subjects[subject].length}`
    );
  });
});
