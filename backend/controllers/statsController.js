const mongoose = require("mongoose")
const User = require("../models/User")
const Match = require("../models/Match"); 


// Get win rate 
const getWinRate = async (req, res) => {
    try {
        const {userId} = req.params; 
        let totalMatches = 0 
        
        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({error: "Invalid user ID - cannot get win rate"})
        }

        const matches = await Match.find({
            $or: [{player1: userId}, {player2: userId}]
        })

        totalMatches = matches.length; 

        if (totalMatches === 0) {
            return res.status(200).json({
                totalWins: 0, 
                totalMatches: 0, 
                winRate: 0
            });
        }
        
        let totalWins = 0 
        
        matches.forEach(match => {
            if(match.winner && match.winner.toString() === userId) {
                totalWins++; 
            }
        })

        const winRate = Math.floor((totalWins / totalMatches) * 100)

        return res.status(200).json({
            totalWins,
            totalMatches, 
            winRate
        })

    } catch (error) {
        return res.status(500).json({error: "Could not get win rate!"})        
    }
}


// Get score distribution  
const getScoreDistribution = async (req, res) => {
    // GET THE USER ID 
    // Score ranges ---> 0 - 5, 6 - 8, 9 - 10, 11, 12+
    try {
        const {userId} = req.params; 

        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({error: "Invalid user ID - cannot get score distribution"})
        }

        const scoreRanges = {
            '0-5': 0, 
            '6-8': 0, 
            '9-10': 0,
            '11': 0,
            '12+': 0
        }

        const matches = await Match.find({
            $or: [{player1: userId}, {player2: userId}]
        })

        matches.forEach(match => {
            match.scores.forEach(game => {
                const score = match.player1.equals(userId) ? game.player1Score : game.player2Score; 
                
                if(score <= 5) {
                    scoreRanges['0-5']++; 
                }
                else if (score > 5 && score <=8) {
                    scoreRanges['6-8']++; 
                }
                else if (score > 8 && score <= 10) {
                    scoreRanges['9-10']++; 
                }
                else if (score === 11) {
                    scoreRanges['11']++; 
                }
                else {
                    scoreRanges['12+']++; 
                }
            })
        })

        const orderedRanges = [
            { range: "0-5", count: scoreRanges["0-5"] },
            { range: "6-8", count: scoreRanges["6-8"] },
            { range: "9-10", count: scoreRanges["9-10"] },
            { range: "11", count: scoreRanges["11"] },
            { range: "12+", count: scoreRanges["12+"] },
          ];

        return res.status(200).json(orderedRanges); 
        
    } catch (error) {
        return res.status(500).json({message: "Server Error! Could not get score ranges"}); 
        
    }
    
    
}

// GET TOP 5 OPPONENTS 
const getTopFiveOpponents = async (req, res) => {
    try {
        const {userId} = req.params;
        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({error: "Invalid user ID - cannot get score distribution"})
        }

        const matches = await Match.find({
            $or: [{player1: userId}, {player2: userId}]
        })

        const topOpponents = {} 

        for (const match of matches) {
            const opponentId = match.player1.equals(userId) ? match.player2.toString() : match.player1.toString();  
            const opponent = await User.findById(opponentId).select("displayName");
             
            if(!opponent) continue; 

            const opponentName = opponent.displayName; 
             
            
            if(!topOpponents[opponentName]) {
                topOpponents[opponentName] = 1
            } else {
                topOpponents[opponentName] += 1
            }
        }

        const sortedTopOpponents = Object.entries(topOpponents).sort((a, b) => b[1] - a[1]).slice(0, 5)
        const formattedTopFiveOpponents = sortedTopOpponents.map(([displayName, count]) => ({
            displayName, 
            matchesPlayed: count,
        }))

        return res.status(200).json(formattedTopFiveOpponents)


    } catch (error) {
        return res.status(500).json({message: "Server error! Could not get top 5 opponents"})
    }
}


module.exports = {getScoreDistribution, getTopFiveOpponents, getWinRate}