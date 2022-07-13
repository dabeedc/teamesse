// References:
// https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// https://www.geeksforgeeks.org/object-entries-javascript/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

const allUsersStats = require("../data/usersStats.json");

const User = require("../../models/user.model");

const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.send(allUsersStats);
});

function buildDate(key) {
  let day = new Date(key).getDay()
  if (day < 10) {
    day = `0${day}`
  }
  let month = new Date(key).getMonth() + 1
  if (month < 10) {
    month = `0${month}`
  }
  let year = new Date(key).getFullYear()

  let returnDate = `${year}-${month}-${day}`
  return returnDate
}

router.get("/stats/:userId", async function (req, res, next) {
  const foundUser = await User.findById(req.params.userId);
  if (!foundUser) return res.status(404).send({ message: "user not found" });
  userPomodorosArr = foundUser["pomodoros"];

  let pomodoroMap = new Map();
  for (let p = 0; p < userPomodorosArr.length; p++) {
    let dateCompletedKey = userPomodorosArr[p]["dateCompleted"];
    let pomodoroDuration = userPomodorosArr[p]["duration"];
    if (pomodoroMap.has(dateCompletedKey)) {
      let newDuration = pomodoroMap[dateCompletedKey] + pomodoroDuration;
      pomodoroMap.set(dateCompletedKey, newDuration);
    } else {
      pomodoroMap.set(dateCompletedKey, pomodoroDuration);
    }
  }
  let pomodoroObj = Object.fromEntries(pomodoroMap);
  let pomodoroList = Object.keys(pomodoroObj).map((key) => ({
    value: pomodoroObj[key],
    day: buildDate(key)
  }));

  
  // console.log("print here", pomodoroList);
  return res.send(pomodoroList);
});

router.get("/:userId", async function (req, res, next) {
  const foundUser = await User.findById(req.params.userId);

  if (!foundUser) return res.status(404).send({ message: "user not found" });
  userPomodorosArr = foundUser["pomodoros"];

  let accumulatedPomodoros = 0;
  for (let p = 0; p < userPomodorosArr.length; p++) {
    accumulatedPomodoros += userPomodorosArr[p]["duration"]
  }
  accumulatedPomodoros = accumulatedPomodoros / 60;
  accumulatedPomodoros = accumulatedPomodoros.toString()
  // console.log("print here", accumulatedPomodoros);
  return res.send({ value: accumulatedPomodoros });
});

module.exports = router;
