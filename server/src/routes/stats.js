// References:
// https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// https://www.geeksforgeeks.org/object-entries-javascript/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
// https://stackoverflow.com/questions/16507866/how-to-iterate-over-objects-property-value-pairs
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round

const allUsersStats = require("../data/usersStats.json");

const User = require("../../models/user.model");

const { Router } = require("express");
const router = Router();

router.get("/", (require, res) => {
  res.send(allUsersStats);
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

  let accumulatedPomodoroSessions = 0;
  for (const element of userPomodorosArr) {
    accumulatedPomodoroSessions += 1;
  }
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

router.put("/update/:userId", function (req, res) {
  const user = new User({
    _id: req.params.userId,
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    occupation: req.body.occupation,
    employer: req.body.employer,
    description: req.body.description,
  });
  User.findByIdAndUpdate(req.params.userId, user, { new: true })
    .then((a) => res.json(a))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;