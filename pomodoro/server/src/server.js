const express = require("express");

const auth = require("./routes/auth");
const stats = require("./routes/stats");

const cors = require("cors");
const PORT = 3001;

const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.ATLAS_URI;

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
/** Mongo Connection */
mongoose.connect(uri);

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});
