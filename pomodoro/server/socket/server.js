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

const broadcastToRoom = (subject, msg) => {
  subjects[subject].forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          room: subject,
          message: msg,
          users: subjects[subject].map((client) => client.id),
        })
      );
    }
  });
};

const broadcastRoomUpdate = () => {
  wss.clients.forEach((client) =>
    client.send(
      JSON.stringify({
        subjects: Object.entries(subjects).map(([subject, clients]) => ({
          subject,
          users: clients.map((client) => client.id),
        })),
      })
    )
  );
};

const getUsername = (path) => path.split("/")[1].toLowerCase();

const connectToRoom = (subject, ws) => {
  if (subject in subjects) {
    if (!subjects[subject].find((client) => client.id === ws.id)) {
      subjects[subject].push(ws);
      broadcastToRoom(subject, `${ws.id} joined`);
      broadcastRoomUpdate();
    }
  } else {
    throw new Error(`${subject} not a valid subject`);
  }
};

const disconnectFromRoom = (ws) => {
  const room = Object.entries(subjects).find(([_, clients]) =>
    clients.some((client) => client.id === ws.id)
  );

  if (room) {
    const [subject, clients] = room;
    subjects[subject] = clients.filter((client) => client.id !== ws.id);
    broadcastToRoom(subject, `${ws.id} left`);
    broadcastRoomUpdate();
  }
};

wss.on("connection", (ws, req) => {
  const username = getUsername(req.url);
  ws.id = username;

  broadcastRoomUpdate();

  ws.on("message", (data) => {
    const { connection, disconnect, subject, message } = JSON.parse(data);

    if (connection && subject) {
      try {
        connectToRoom(subject, ws);
      } catch (err) {
        console.error(err);
        ws.close();
      }
    } else if (subject && message) {
      broadcastToRoom(subject, `${ws.id} says: ${message}`);
    } else if (disconnect) {
      disconnectFromRoom(ws);
    }
  });

  ws.on("close", () => {
    disconnectFromRoom(ws);
  });
});
