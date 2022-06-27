const express = require("express");

const auth = require("./routes/auth");
const stats = require("./routes/stats");

const cors = require("cors");
const PORT = 3001;

const app = express();

/** Middleware */
app.use(express.json());
app.use(cors());

/** Routes */
app.use("/auth", auth);
app.use("/stats", stats);

/** Start server */
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
