const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactionSchema = new Schema({
  emoji: String,
  count: Number
})

const sessionSchema = new Schema({
  duration: Number,
  dateCompleted: Date,
  subject: String,
  reactions: [reactionSchema]
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
    password: {
      type: String
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

// Hashes password
userSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;