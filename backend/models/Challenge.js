const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "declined", "ongoing"],
        default: "pending",
    },
    bestOf: {
        type: Number,
        enum: [1, 3, 5],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Challenge = mongoose.model("Challenge", challengeSchema)

module.exports = Challenge; 