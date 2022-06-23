const allUsersStats = require("../data/usersStats.json");
const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.send(allUsersStats)
})

module.exports = router;
