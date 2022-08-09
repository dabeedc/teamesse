const Users = require("../../models/user.model.js");
const { Router } = require("express");
const router = Router();

const EMOJIS = ["😄", "😁", "🤣", "🤩", "👍", "🍅", "☕"];

const DEFAULT_EMOJIS = EMOJIS.map((emoji) => ({ emoji, count: 0 }));

router.post("/new", async (req, res) => {
  const { id, duration, subject } = req.body;
  const user = await Users.findById(id);
  user.pomodoros.push({
    duration,
    subject,
    reactions: DEFAULT_EMOJIS,
    dateCompleted: new Date(),
  });
  await user.save();
  res.send(user);
});

router.get("/lofi", async (req, res) => {
  const lofiGirl = await Users.find({ username: "lofi" });
  res.send(lofiGirl);
});

module.exports = router;
