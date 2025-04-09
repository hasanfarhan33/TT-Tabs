const mongoose = require("mongoose"); 

const matchSchema = new mongoose.Schema({
    player1: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
    }, 
    player2: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
    },
    scores: [
        {
            player1Score: Number, 
            player2Score: Number,
        }
    ], 
    bestOf: {
        type: Number, 
        enum: [1, 3, 5],
        required: true, 
    }, 
    startedAt: {
        type: Date, 
        default: Date.now 
    }, 
    endedAt: {
        type: Date, 
    }
})

const Match = mongoose.model("Match", matchSchema)

module.exports = Match; 