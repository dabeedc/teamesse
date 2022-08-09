const bcrypt = require("bcryptjs");
const User = require("../../models/user.model.js");
const { Router } = require("express");
const router = Router();

router.get("/users", async (_, res) => {
  const users = await User.find({});
  return users;
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(404).send({ message: `Username ${username} not found.` });
    return;
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    res.status(401).send({ message: "Incorrect password." });
    return;
  }

  const { password: pw, ...userDetails } = user; // filters out the password. don't want to send it with the rest of the user details
  res.status(200).send(userDetails);
});

router.post("/signup", async (req, res) => {
  try {
    const user = new User({
      ...req.body,
    });
    await user.save();
    const { password: password, ...userDetails } = user; // filters out the password. don't want to send it with the rest of the user details
    res.status(200).send(userDetails);
  } catch (e) {
    res.status(500);
  }
});

// TODO
router.delete("/:userId", (_, res) => {
  res.status(501).send({ message: "/delete not yet implemented." });
});

module.exports = router;
