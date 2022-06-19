const express = require("express");
const auth = require("./routes/auth");
const cors = require("cors");
const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
