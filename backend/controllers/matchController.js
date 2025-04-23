const mongoose = require("mongoose"); 
const Challenge = require("../models/Challenge")
const User = require("../models/User")
const Match = require("../models/Match"); 
const sendEmail = require("../utils/sendEmail")


// Create a match 
const createMatch = async (req, res) => {
    try {
        const {challengeId, playerOne, playerTwo, scores, bestOf, winner} = req.body; 
        console.log("Match Data: ", req.body); 

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
    
        res.status(201).json({message: `Match created successfully: ${newMatch}`})
    } catch (error) {
        res.status(500).json({message: `Failed to create a match ${error}`}); 
    }

}

// GET ALL MATCHES 

// GET WON MATCHES 

module.exports = {createMatch}
