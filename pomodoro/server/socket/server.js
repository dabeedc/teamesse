const { WebSocket, WebSocketServer } = require("ws");
const {
  startTimerForRoom,
  pauseTimerForRoom,
  resetTimerForRoom,
  stopTimerForRoom,
  resumeTimerForRoom,
} = require("./timer");

const subjectNames = [
  "math",
  "compsci",
  "english",
  "biology",
  "chemistry",
  "polisci",
  "general",
];

const subjects = subjectNames.reduce((res, curr) => {
  res[curr] = [];
  return res;
}, {});

const wss = new WebSocketServer({ port: 8080, host: "0.0.0.0" });

const broadcastToRoom = (subject, id, msg) => {
  subjects[subject].forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          room: subject,
          sender: id,
          message: msg,
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
      broadcastToRoom(subject, "server", `${ws.id} joined`);
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
    broadcastToRoom(subject, "server", `${ws.id} left`);
  }
};

wss.on("connection", (ws, req) => {
  const username = getUsername(req.url);
  ws.id = username;

  ws.send(
    JSON.stringify({
      subjects: Object.entries(subjects).map(([subject, clients]) => ({
        subject,
        users: clients.map((client) => client.id),
      })),
    })
  );

  ws.on("message", (data) => {
    const { connection, disconnect, subject, message, interval, mode, func } =
      JSON.parse(data);

    if (connection && subject) {
      try {
        disconnectFromRoom(ws);
        connectToRoom(subject, ws);
        broadcastRoomUpdate();
      } catch (err) {
        console.error(err);
        ws.close();
      }
    } else if (subject && message) {
      broadcastToRoom(subject, ws.id, message);
    } else if (disconnect) {
      disconnectFromRoom(ws);
      broadcastRoomUpdate();
    } else if (subject && interval && mode && func) {
      switch (func) {
        case "START":
          if (subject in subjects) {
            broadcastToRoom(
              subject,
              "server",
              `${ws.id} started the ${mode} timer! ${interval} minutes in this interval.`
            );
            startTimerForRoom({ id: ws.id, subject, subjects, interval, mode });
          }
          break;
        case "PAUSE":
          broadcastToRoom(subject, "server", `${ws.id} paused the timer.`);
          pauseTimerForRoom(subject);
          break;
        case "STOP":
          broadcastToRoom(subject, "server", `${ws.id} reset the timer.`);
          stopTimerForRoom(subject);
          break;
        case "RESUME":
          broadcastToRoom(subject, "server", `${ws.id} stopped the timer.`);
          resumeTimerForRoom(subject);
          break;
        case "RESET":
          broadcastToRoom(subject, "server", `${ws.id} resumed the timer.`);
          resetTimerForRoom(subject);
          break;
        default:
          break;
      }
    }
  });

  ws.on("close", () => {
    disconnectFromRoom(ws);
    broadcastRoomUpdate();
  });
});
