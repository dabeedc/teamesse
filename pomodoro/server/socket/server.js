const { WebSocket, WebSocketServer } = require("ws");
const Timer = require("easytimer.js").Timer;

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

const timers = {};

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

const updateRoomTimer = (subject) => {
  const { mode, timer, interval } = timers[subject];
  subjects[subject].forEach((client) => {
    client.send(
      JSON.stringify({
        mode,
        timeLeft: timer.getTimeValues().toString(),
        ratio: timer.getTotalTimeValues().seconds / interval,
      })
    );
  });
};

const startTimerForRoom = ({ id, subject, interval, mode }) => {
  if (subject in subjects) {
    broadcastToRoom(
      subject,
      "server",
      `${id} started the ${mode} timer! ${interval} minutes in this interval.`
    );

    const timer = new Timer();

    timer.addEventListener("secondsUpdated", () => {
      updateRoomTimer(subject);
    });

    timer.addEventListener("targetAchieved", () => {
      stopTimerForRoom({ id, subject });
      startTimerForRoom({
        id,
        subject,
        interval,
        mode: mode === "focus" ? "break" : "focus",
      });
    });

    timer.start({ countdown: true, startValues: { seconds: interval } });

    timers[subject] = {
      mode,
      timer,
      interval,
    };
  }
};

const pauseTimerForRoom = ({ id, subject }) => {
  if (subject in timers) {
    broadcastToRoom(subject, "server", `${id} paused the timer.`);
    timers[subject].timer.pause();
  }
};

const resetTimerForRoom = ({ id, subject }) => {
  if (subject in timers) {
    broadcastToRoom(subject, "server", `${id} reset the timer.`);
    timers[subject].timer.reset();
  }
};

const stopTimerForRoom = ({ id, subject }) => {
  if (subject in timers) {
    broadcastToRoom(subject, "server", `${id} stopped the timer.`);
    timers[subject].timer.stop();
    delete timers[subject];
  }
};

const resumeTimerForRoom = ({ id, subject }) => {
  if (subject in timers) {
    broadcastToRoom(subject, "server", `${id} resumed the timer.`);
    timers[subject].timer.start();
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
          startTimerForRoom({ id: ws.id, subject, interval, mode });
          break;
        case "PAUSE":
          pauseTimerForRoom({ id: ws.id, subject });
          break;
        case "STOP":
          stopTimerForRoom({ id: ws.id, subject });
          break;
        case "RESUME":
          resumeTimerForRoom({ id: ws.id, subject });
          break;
        case "RESET":
          resetTimerForRoom({ id: ws.id, subject });
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
