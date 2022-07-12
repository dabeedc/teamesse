const allUsersStats = require("../data/usersStats.json");

const users = require("../mockData.json");
const User = require("../../models/user.model");

const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.send(allUsersStats);
});

router.get('/:userId', async function (req, res, next) {
    const foundUser = await User.findById(req.params.userId);

    if (!foundUser) return res.status(404).send({ message: 'user not found' });

    return res.send(foundUser);
});

// {
//     totalMinutesStudied: 400,
//     sessionsCompleted: 40,
//     sessions: [
//         { ... pomodoro sessions }
//     ]
// }

// router.get("/blah", async (req, res) => {
//   await Promise.all(
//     users.map(async (user) => {
//       const newUser = new User(user);
//       await newUser.save();
//     })
//   );
//   res.send("ok");
// });


module.exports = router;
