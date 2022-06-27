const { WebSocket, WebSocketServer } = require("ws");

const subjectNames = [
  "math",
  "compsci",
  "english",
  "biology",
  "chemistry",
  "polisci",
];

const subjects = subjectNames.reduce((res, curr) => {
  res[curr] = [];
  return res;
}, {});

const wss = new WebSocketServer({ port: 8080, host: "0.0.0.0" });

const broadcast = (subject, msg) => {
  subjects[subject].forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          message: msg,
          users: subjects[subject].map((client) => client.id),
        })
      );
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

  broadcast(subject, `${ws.id} joined`);

  ws.on("message", (data) => {
    broadcast(subject, `${ws.id} says: ${data}`);
  });

  ws.on("close", () => {
    subjects[subject] = subjects[subject].filter(
      (client) => client.id !== ws.id
    );
    broadcast(subject, `${ws.id} left`);
  });
});
