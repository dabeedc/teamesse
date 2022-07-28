const allUsers = require("../data/users.json");
const User = require("../../models/user.model.js");
const { v4: uuid } = require("uuid");
const { Router } = require("express");
const router = Router();

const users = allUsers.map((user) => ({ id: uuid(), ...user }));

router.get("/users", (_, res) => {
  res.send(users);
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);

  if (!user) {
    res.status(404).send({ message: `Username ${username} not found.` });
    return;
  }

  if (user.password !== password) {
    res.status(401).send({ message: "Incorrect password." });
    return;
  }

  const { password: pw, ...userDetails } = user; // filters out the password. don't want to send it with the rest of the user details
  res.status(200).send(userDetails);
});

router.post("/signup", async (req, res) => {
  try {
	const user = new User({
		...req.body
	})
	await user.save();
	const {password: password, ...userDetails} = user; // filters out the password. don't want to send it with the rest of the user details
	res.status(200).send(userDetails);
  } catch(e) { 
	res.status(500);
  }
});

// TODO
router.delete("/:userId", (_, res) => {
  res.status(501).send({ message: "/delete not yet implemented." });
});

module.exports = router;
