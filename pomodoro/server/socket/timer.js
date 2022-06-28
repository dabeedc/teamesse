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
  subjects[subject].forEach((client) => {
    client.send(
      JSON.stringify({
        type: "timer",
        ...msg,
      })
    );
  });
};

const updateRoom = (subject, subjects) => {
  const { mode, timer, interval, running } = timers[subject];
  sendToRoom(subject, subjects, {
    mode,
    interval,
    timeLeft: timer.getTimeValues().toString(),
    ratio: timer.getTotalTimeValues().seconds / interval,
    running,
  });
};

const startTimerForRoom = ({ id, subject, subjects, interval, mode }) => {
  const timer = new Timer();

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

  timer.start({ countdown: true, startValues: { seconds: interval } });

  timers[subject] = {
    mode,
    timer,
    interval,
    running: true,
  };
};

const pauseTimerForRoom = ({ subject, subjects }) => {
  if (subject in timers) {
    timers[subject].timer.pause();
    timers[subject].running = false;
    updateRoom(subject, subjects);
  }
};

const resetTimerForRoom = ({ subject, subjects }) => {
  if (subject in timers) {
    timers[subject].timer.reset();
    timers[subject].running = false;
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
    });
    timer.stop();
    delete timers[subject];
  }
};

const resumeTimerForRoom = ({ subject, subjects }) => {
  if (subject in timers) {
    timers[subject].timer.start();
    timers[subject].running = true;
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
