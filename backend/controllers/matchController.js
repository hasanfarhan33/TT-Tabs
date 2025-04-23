const mongoose = require("mongoose"); 
const Challenge = require("../models/Challenge")
const User = require("../models/User")
const Match = require("../models/Match"); 
const sendEmail = require("../utils/sendEmail")


// Create a match 
const createMatch = async (req, res) => {
    try {
        const {challengeId, playerOne, playerTwo, scores, bestOf, winner} = req.body; 
        // console.log("Match Data: ", req.body); 
        console.log("Scores in backend: ", scores)

        // Save the match 
        const newMatch = await Match.create({
            challengeId: challengeId, 
            player1: playerOne, 
            player2: playerTwo, 
            scores: scores,
            bestOf: bestOf, 
            winner: winner
        }); 
    
        // Marking the challenge as finished 
        await Challenge.findByIdAndUpdate(challengeId, {status: "finished"}); 
    
        // Update the players total matches 
        await User.findByIdAndUpdate(playerOne, {
            $inc: {
                totalMatches: 1,
                totalWins: winner === playerOne ? 1 : 0, 
            }, 
        })
    
        await User.findByIdAndUpdate(playerTwo, {
            $inc: {
                totalMatches: 1, 
                totalWins: winner === playerTwo ? 1 : 0, 
            },
        })

        const firstPlayer = await User.findById(playerOne)
        const secondPlayer = await User.findById(playerTwo)

        if(!firstPlayer || !secondPlayer) {
            res.status(400).json({error: "Could not find the player(s)"}); 
        }
        
        // Send email to player one     
        const firstPlayerEmailText = `Hey ${firstPlayer.displayName}, new match info has been added!`
        const firstPlayerEmailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #4F46E5;">New Match Info Added!</h2>
            <p>Hey <strong>${firstPlayer.displayName}</strong>,</p>
            <p>Information of your recent match with <strong>${secondPlayer.displayName}</strong> has been added!</p>
            <p>Login to TT-Tabs to see all your previous matches.</p>
            <hr style="margin: 20px 0;" />
            <small style="color: gray;">This is an automated message from TT-Tabs. Please do not reply.</small>
        </div>
        `
        await sendEmail(
            firstPlayer.email, 
            "TT-Tabs - New Match Info Added!", 
            firstPlayerEmailText, 
            firstPlayerEmailHtml
        )

        // Send email to player two 
        const secondPlayerEmailText = `Hey ${secondPlayer.displayName}, new match info has been added!` 
        const secondPlayerEmailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #4F46E5;">New Match Info Added!</h2>
            <p>Hey <strong>${secondPlayer.displayName}</strong>,</p>
            <p>Information of your recent match with <strong>${firstPlayer.displayName}</strong> has been added!</p>
            <p>Login to TT-Tabs to see all your previous matches.</p>
            <hr style="margin: 20px 0;" />
            <small style="color: gray;">This is an automated message from TT-Tabs. Please do not reply.</small>
        </div>
        `

        await sendEmail(
            secondPlayer.email, 
            "TT-Tabs - New Match Info Added!", 
            secondPlayerEmailText, 
            secondPlayerEmailHtml,
        )
        console.log(`Match created successfully: ${newMatch}`)
        res.status(201).json({message: `Match created successfully: ${newMatch}`})
    } catch (error) {
        res.status(500).json({message: `Failed to create a match ${error}`}); 
    }

}


// REMOVE A MATCH 
const removeMatch = async (req, res) => {
    try {
        const {matchId} = req.params; 

        // Making sure that the match id is valid 
        if(!mongoose.Types.ObjectId.isValid(matchId)) {
            return res.status(400).json({error: `Invalid Match ID - could not delete match`}); 
        }

        const matchToDelete = await Match.findById(matchId)
        
        if(!matchToDelete) {
            return res.status(404).json({error: `Could not find a match to delete`})
        }

        const playerOneId = matchToDelete.player1; 
        const playerTwoId = matchToDelete.player2; 
        const winnerId = matchToDelete.winner; 

        // Decrementing the total matches for both users 
        await User.findByIdAndUpdate(playerOneId, {
            $inc: {
                totalMatches: -1, 
                totalWins: winnerId.toString() === playerOneId.toString() ? -1 : 0
            }
        })

        await User.findByIdAndUpdate(playerTwoId, {
            $inc: {
                totalMatches: -1, 
                totalWins: winnerId.toString() === playerTwoId.toString() ? -1: 0
            }
        })

        // Remove challenge related to the match 
        const challengeId = matchToDelete.challengeId;
        
        // Make sure that the challenge id is valid 
        if(!mongoose.Types.ObjectId.isValid(challengeId)) {
            return res.status(400).json({message: "Challenge ID is not valid --> Could not delete match"})
        }

        await Challenge.findByIdAndDelete(challengeId)

        await Match.findByIdAndDelete(matchId); 

        res.status(200).json({message: "Successfully Removed Match"})

    } catch (error) {
        res.status(500).json({error: "Server error -> Cannot remove match"})
    }
}

// GET ALL MATCHES 
const getAllMatches = async (req, res) => {
    try {
        const {userId} = req.params;

        // Making sure that the user id is valid 
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({error: `Invalid user ID - cannot find match`})
        }

        const previousMatches = await Match.find({
            $or: [
                {player1: userId}, 
                {player2: userId}
            ]
        }); 

        if(!previousMatches.length) {
            return res.status(404).json({message: "No matches found"}); 
        }

        return res.status(200).json(previousMatches)
    
        
    } catch (error) {
        res.status(500).json({message: "Server Error! Could not find previous matches."})
    }
}

module.exports = {getAllMatches, createMatch, removeMatch}
