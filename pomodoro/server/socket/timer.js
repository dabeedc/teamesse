const Timer = require("easytimer.js").Timer;

const timers = {};

const startTimerForRoom = ({ id, subject, subjects, interval, mode }) => {
  const timer = new Timer();

  timer.addEventListener("secondsUpdated", () => {
    const { mode, timer, interval, running } = timers[subject];
    subjects[subject].forEach((client) => {
      client.send(
        JSON.stringify({
          mode,
          timeLeft: timer.getTimeValues().toString(),
          ratio: timer.getTotalTimeValues().seconds / interval,
          running,
        })
      );
    });
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

const pauseTimerForRoom = (subject) => {
  if (subject in timers) {
    timers[subject].timer.pause();
    timers[subject].running = false;
  }
};

const resetTimerForRoom = (subject) => {
  if (subject in timers) {
    timers[subject].timer.reset();
    timers[subject].running = false;
  }
};

const stopTimerForRoom = (subject) => {
  if (subject in timers) {
    timers[subject].timer.stop();
    delete timers[subject];
  }
};

const resumeTimerForRoom = (subject) => {
  if (subject in timers) {
    timers[subject].timer.start();
    timers[subject].running = true;
  }
};

module.exports = {
  startTimerForRoom,
  pauseTimerForRoom,
  resetTimerForRoom,
  stopTimerForRoom,
  resumeTimerForRoom,
};
