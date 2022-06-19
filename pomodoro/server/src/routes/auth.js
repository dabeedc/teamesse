const santa = require("../data/fakeUser.json");
const { v4: uuid } = require("uuid");
const { Router } = require("express");
const router = Router();

const users = [{ id: uuid(), ...santa }];

router.get("/", (_, res) => {
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

  const { password: pw, ...userDetails } = user;
  res.status(200).send(userDetails);
});

// TODO
router.post("/signup", (_, res) => {
  res.status(501).send({ message: "/signup not yet implemented." });
});

// TODO
router.delete("/:userId", (_, res) => {
  res.status(501).send({ message: "/delete not yet implemented." });
});

module.exports = router;
