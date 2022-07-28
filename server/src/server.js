const express = require("express");

const auth = require("./routes/auth");
const stats = require("./routes/stats");
const { wss } = require("../socket/server");
const path = require("path");

const cors = require("cors");
const PORT = process.env.PORT || 3001;

const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

/** Middleware */
app.use(express.json());
app.use(cors());

/** Routes */
app.use("/auth", auth);
app.use("/stats", stats);

app.get("/port", (_, res) => res.status(200).send({ port: PORT }));

// https://stackoverflow.com/questions/59850705/how-to-deploy-react-application-to-heroku
app.use(express.static(path.join(__dirname, "../build")));
app.get("/", (_, res) =>
  res.sendFile(path.resolve(__dirname, "../build", "index.html"))
);

mongoose.connect(`${process.env.ATLAS_URI}`);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

/** Start server */
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (socket) => {
    wss.emit("connection", socket, req);
  });
});

/** Mongo Connection */
