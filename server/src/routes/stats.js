// References:
// https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// https://www.geeksforgeeks.org/object-entries-javascript/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
// https://stackoverflow.com/questions/16507866/how-to-iterate-over-objects-property-value-pairs
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round

const User = require("../../models/user.model");

const { Router } = require("express");
const router = Router();

const getJSON = (document) => {
  const { _id, __v, ...rest } = document.toJSON();
  return { id: _id, ...rest };
};

router.get("/", async (_, res) => {
  const users = await User.find();
  res.send(
    users
      .map(getJSON)
      .map((user) =>
        user.pomodoros.map(({ _id, dateCompleted, duration, ...rest }) => ({
          id: _id,
          username: user.username,
          userId: user.id,
          date: dateCompleted,
          duration: `${(duration / 60).toFixed(2)} mins`,
          ...rest,
        }))
      )
      .flat(Infinity)
  );
});

router.post("/add_reaction", async (req, res) => {
  const { userId, reactionId, sessionId } = req.body;
  const user = await User.findById(userId);
  const session = user.pomodoros.id(sessionId);
  const reaction = session.reactions.id(reactionId);
  reaction.count++;
  await user.save();
  res.send({ message: "upvote ok" });
});

router.post("/remove_reaction", async (req, res) => {
  const { userId, reactionId, sessionId } = req.body;
  const user = await User.findById(userId);
  const session = user.pomodoros.id(sessionId);
  const reaction = session.reactions.id(reactionId);
  if (reaction.count > 0) {
    reaction.count--;
  }
  await user.save();
  res.send({ message: "downvote ok" });
});

function buildDate(key) {
  let day = new Date(key).getDay();
  if (day < 10) {
    day = `0${day}`;
  }
  let month = new Date(key).getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let year = new Date(key).getFullYear();

  return `${year}-${month}-${day}`;
}

router.get("/pomodoro/:userId", async function (req, res) {
  const foundUser = await User.findById(req.params.userId);
  if (!foundUser) return res.status(404).send({ message: "user not found" });
  let userPomodorosArr = foundUser["pomodoros"];

  let pomodoroMap = new Map();
  for (const element of userPomodorosArr) {
    let dateCompletedKey = element["dateCompleted"];
    let pomodoroDuration = element["duration"];
    if (pomodoroMap.has(dateCompletedKey)) {
      let newDuration = pomodoroMap[dateCompletedKey] + pomodoroDuration;
      pomodoroMap.set(dateCompletedKey, newDuration);
    } else {
      pomodoroMap.set(dateCompletedKey, pomodoroDuration);
    }
  }
  let pomodoroObj = Object.fromEntries(pomodoroMap);
  let pomodoroList = Object.keys(pomodoroObj).map((key) => ({
    value: pomodoroObj[key] / 60,
    day: buildDate(key),
  }));

  return res.send(pomodoroList);
});

router.get("/subject/:userId", async function (req, res) {
  const foundUser = await User.findById(req.params.userId);
  if (!foundUser) return res.status(404).send({ message: "user not found" });
  let userPomodorosArr = foundUser["pomodoros"];

  let pomodoroMap = new Map();
  for (const element of userPomodorosArr) {
    let subjectKey = element["subject"];
    let pomodoroDuration = element["duration"];
    if (pomodoroMap.has(subjectKey)) {
      let newDuration = pomodoroMap.get(subjectKey) + pomodoroDuration;
      pomodoroMap.set(subjectKey, newDuration);
    } else {
      pomodoroMap.set(subjectKey, pomodoroDuration);
    }
  }
  let pomodoroObj = Object.fromEntries(pomodoroMap);
  let pomodoroList = Object.keys(pomodoroObj).map((key) => ({
    id: key,
    label: key,
    value: pomodoroObj[key] / 60,
  }));
  return res.send(pomodoroList);
});

router.get("/:userId", async function (req, res, next) {
  const foundUser = await User.findById(req.params.userId);
  if (!foundUser) return res.status(404).send({ message: "user not found" });
  let userPomodorosArr = foundUser["pomodoros"];

  let accumulatedPomodoros = 0;
  for (const element of userPomodorosArr) {
    accumulatedPomodoros += element["duration"];
  }
  accumulatedPomodoros = accumulatedPomodoros / 60;
  accumulatedPomodoros = accumulatedPomodoros.toString();
  return res.send({ time: accumulatedPomodoros });
});

router.get("/pomodoroSession/:userId", async function (req, res, next) {
  const foundUser = await User.findById(req.params.userId);
  if (!foundUser) return res.status(404).send({ message: "user not found" });
  let userPomodorosArr = foundUser["pomodoros"];
  let accumulatedPomodoroSessions = userPomodorosArr.length;
  accumulatedPomodoroSessions = accumulatedPomodoroSessions.toString();
  return res.send({ session: accumulatedPomodoroSessions });
});

router.get("/pomodoroAverageSession/:userId", async function (req, res) {
  const foundUser = await User.findById(req.params.userId);

  if (!foundUser) return res.status(404).send({ message: "user not found" });
  let userPomodorosArr = foundUser["pomodoros"];

  let avgPomodoroSession = 0;
  let pomodoroMap = new Map();
  let dateCount = 0;
  let totalDuration = 0;
  for (const element of userPomodorosArr) {
    let dateCompletedKey = element["dateCompleted"];
    let pomodoroDuration = element["duration"];
    if (pomodoroMap.has(dateCompletedKey)) {
      totalDuration = totalDuration + pomodoroDuration;
    } else {
      dateCount++;
      totalDuration = totalDuration + pomodoroDuration;
    }
  }

  totalDuration = totalDuration / 60;
  avgPomodoroSession = Math.round(totalDuration / dateCount);
  avgPomodoroSession = avgPomodoroSession.toString();
  return res.send({ time: avgPomodoroSession });
});

module.exports = router;
