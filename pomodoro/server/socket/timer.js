const Timer = require("easytimer.js").Timer;

const timers = {};

const formatAsTimeString = (secs) => {
  const extend = (val) => (val > 1 ? `${val >= 10 ? val : `0${val}`}` : "00");

  const numHours = Math.floor(secs / 3600);
  const numMinutes = (secs - numHours * 3600) / 60;
  const numSecs = secs - 3600 * numHours - 60 * numMinutes;

  return `${extend(numHours)}:${extend(numMinutes)}:${extend(numSecs)}`;
};

const sendToRoom = (subject, subjects, msg) => {
  if (subjects && subject in subjects) {
    subjects[subject].forEach((client) => {
      client.send(
        JSON.stringify({
          type: "timer",
          ...msg,
        })
      );
    });
  }
};

const updateRoom = (subject, subjects) => {
  if (subject in timers) {
    const { mode, timer, interval, running, state } = timers[subject];
    sendToRoom(subject, subjects, {
      mode,
      interval,
      timeLeft: timer.getTimeValues().toString(),
      ratio: timer.getTotalTimeValues().seconds / interval,
      running,
      state,
    });
  }
};

const startTimerForRoom = ({
  id,
  subject,
  subjects,
  interval,
  mode,
  paused,
}) => {
  const timer = new Timer({
    countdown: true,
    startValues: { seconds: interval },
  });

  timer.addEventListener("secondsUpdated", () => {
    updateRoom(subject, subjects);
  });

  timer.addEventListener("targetAchieved", () => {
    stopTimerForRoom({ id, subject });
    startTimerForRoom({
      id,
      subject,
      subjects,
      interval,
      mode: mode === "focus" ? "break" : "focus",
    });
  });

  if (paused) {
    timers[subject] = {
      mode,
      timer,
      interval,
      running: false,
      state: "stopped",
    };
  } else {
    timer.start({ countdown: true, startValues: { seconds: interval } });
    timers[subject] = {
      mode,
      timer,
      interval,
      running: true,
      state: "running",
    };
  }

  updateRoom(subject, subjects);
};

const pauseTimerForRoom = ({ subject, subjects }) => {
  if (subject in timers) {
    timers[subject].timer.pause();
    timers[subject].running = false;
    timers[subject].state = "paused";
    updateRoom(subject, subjects);
  }
};

const resetTimerForRoom = ({ subject, subjects }) => {
  if (subject in timers) {
    timers[subject].timer.reset();
    timers[subject].timer.pause();
    timers[subject].running = false;
    timers[subject].state = "stopped";
    updateRoom(subject, subjects);
  }
};

const stopTimerForRoom = ({ subject, subjects }) => {
  if (subject in timers) {
    const { timer, interval, mode } = timers[subject];
    sendToRoom(subject, subjects, {
      mode,
      timeLeft: formatAsTimeString(interval),
      ratio: 1,
      running: false,
      state: "stopped",
    });
    timer.stop();
    delete timers[subject];
  }
};

const resumeTimerForRoom = ({ subject, subjects }) => {
  if (subject in timers) {
    timers[subject].timer.start();
    timers[subject].running = true;
    timers[subject].state = "running";
    updateRoom(subject, subjects);
  }
};

module.exports = {
  startTimerForRoom,
  pauseTimerForRoom,
  resetTimerForRoom,
  stopTimerForRoom,
  resumeTimerForRoom,
};
