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

    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
