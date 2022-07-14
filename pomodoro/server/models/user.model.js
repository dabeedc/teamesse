
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  duration: Number,
  dateCompleted: Date,
});

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    occupation: {
      type: String,
    },
    employer: {
      type: String,
    },
    description: {
      type: String,
    },
    avatar: {
      type: String,
    },
    pomodoros: {
      type: [sessionSchema],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;