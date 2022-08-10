const { WebSocket, Server } = require("ws");
const {
  startTimerForRoom,
  pauseTimerForRoom,
  resetTimerForRoom,
  stopTimerForRoom,
  resumeTimerForRoom,
  updateClient,
  timers,
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

const wss = new Server({ noServer: true });

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
          timer: subject in timers && {
            mode: timers[subject].mode,
            state: timers[subject].state,
          },
        })),
      })
    )
  );
};

const getUsername = (path) => path.split("/")[1];

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

const getBroadcastMsg = () => {
  return JSON.stringify({
    subjects: Object.entries(subjects).map(([subject, clients]) => ({
      subject,
      users: clients.map((client) => client.id),
      timer: subject in timers && {
        mode: timers[subject].mode,
        state: timers[subject].state,
      },
    })),
  });
};

const broadcastToAll = () => {
  wss.clients.forEach((client) => client.send(getBroadcastMsg()));
};

const handleMessage = ({ ws, data }) => {
  const message = JSON.parse(data);
  const { type, subject } = message;

  switch (type) {
    case "connection":
      try {
        disconnectFromRoom(ws);
        connectToRoom(subject, ws);
        broadcastRoomUpdate();
        updateClient(ws, subject);
      } catch (err) {
        console.error(err);
        ws.close();
      }
      break;
    case "disconnect":
      disconnectFromRoom(ws);
      broadcastRoomUpdate();
      break;
    case "message":
      const { message: msg } = message;
      broadcastToRoom(subject, ws.id, msg);
      break;
    case "timer":
      const { func, mode, focusInterval, breakInterval, paused } = message;
      switch (func) {
        case "START":
          if (subject in subjects) {
            broadcastToRoom(
              subject,
              "server",
              `${ws.id} started the ${mode} timer! ${
                mode === "focus" ? focusInterval / 60 : breakInterval / 60
              } minutes in this interval.`
            );
            startTimerForRoom({
              id: ws.id,
              subject,
              subjects,
              focusInterval,
              breakInterval,
              mode,
              paused,
              broadcastToAll,
            });
          }

          break;
        case "PAUSE":
          broadcastToRoom(subject, "server", `${ws.id} paused the timer.`);
          pauseTimerForRoom({ subject, subjects });
          break;
        case "STOP":
          broadcastToRoom(subject, "server", `${ws.id} stopped the timer.`);
          stopTimerForRoom({ subject, subjects });
          break;
        case "RESUME":
          broadcastToRoom(subject, "server", `${ws.id} resumed the timer.`);
          resumeTimerForRoom({ subject, subjects });
          break;
        case "RESET":
          broadcastToRoom(subject, "server", `${ws.id} reset the timer.`);
          resetTimerForRoom({ subject, subjects });
          break;
        default:
          break;
      }
      broadcastRoomUpdate();
      break;
    default:
      break;
  }
};

wss.on("connection", (ws, req) => {
  const username = getUsername(req.url);
  ws.id = username;

  ws.send(getBroadcastMsg());

  ws.on("message", (data) => {
    handleMessage({ ws, data });
  });

  ws.on("close", () => {
    disconnectFromRoom(ws);
    broadcastRoomUpdate();
  });
});

module.exports = { wss };
