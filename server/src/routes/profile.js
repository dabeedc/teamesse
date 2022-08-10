const User = require("../../models/user.model");

const { Router } = require("express");
const router = Router();

router.put("/update/:userId", async function (req, res) {
  try {
    const user = await User.findById(req.params.userId);
    user.username = req.body.username;
    user.name = req.body.name;
    user.email = req.body.email;
    user.occupation = req.body.occupation;
    user.employer = req.body.employer;
    user.description = req.body.description;
    user.avatar = req.body.avatar;

    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/delete/:userId", function (req, res, next) {
  User.findByIdAndDelete(req.params.userId)
    .then(() => res.json({ id: req.params.userId }))
    .catch((err) => res.status(404).json("Error: " + err));
});

router.get("/info/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  res.send({ info: user });
});

module.exports = router;
