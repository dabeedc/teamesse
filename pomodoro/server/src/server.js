const express = require("express");
const auth = require("./routes/auth");
const cors = require("cors");
const PORT = 3001;

const app = express();

/** Middleware */
app.use(express.json());
app.use(cors());

/** Routes */
app.use("/auth", auth);

/** Start server */
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
