
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
        descrption: {
            type: String,
        },
        avatar: {
            type: String,
        },
        pomodoros: {
            type: Number,
        },
        totalTime: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;