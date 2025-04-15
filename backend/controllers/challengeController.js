const mongoose = require("mongoose");
const Challenge = require("../models/Challenge")
const User = require('../models/User')
const sendEmail = require("../utils/sendEmail")

const sendChallenge = async(req, res) => {
    try {
        const {senderId, receiverName, bestOf} = req.body; 

        const senderObjectId = new mongoose.Types.ObjectId(senderId); 

        const sender = await User.findById(senderObjectId); 
        if(!sender) {
            return res.status(404).json({message: "Sender not found!"})
        }

        // Find the receiver by display name 
        const receiver = await User.findOne({displayName: receiverName})
        if(!receiver) {
            return res.status(404).json({message: "Player not found!"})
        }

        const receiverObjectId = receiver._id; 

        const newChallenge = new Challenge({
            sender: senderObjectId, 
            receiver: receiverObjectId, 
            bestOf
        }); 

        await newChallenge.save(); 

        // After saving the challenge
        const emailText = `Hey ${receiver.displayName}, ${sender.displayName} has challenged you to a Best of ${bestOf} match!`;

        const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #4F46E5;">🏓 You've Been Challenged!</h2>
            <p>Hey <strong>${receiver.displayName}</strong>,</p>
            <p><strong>${sender.displayName}</strong> has challenged you to a <strong>Best of ${bestOf}</strong> match!</p>
            <p>Login to TT-Tabs to accept or decline the challenge.</p>
            <p style="margin-top: 20px;">Good luck! 🏆</p>
            <hr style="margin: 20px 0;" />
            <small style="color: gray;">This is an automated message from TT-Tabs. Please do not reply.</small>
        </div>
        `;

        // Sending an email to the receiver
        await sendEmail(
            receiver.email, 
            "TT-Tabs - You have been challenged! 🏓",
           emailText, 
           emailHtml,
        )

        res.status(201).json({message: "Challenge created successfully", challenge: newChallenge}); 

    } catch (error) {
        console.error(error); 
        res.status(500).json({message: "Server Error: Could not create challenge!"})
    }
}

// Get all challenges for the user
const getPendingChallenges = async (req, res) => {
    try {
        // Check if the challenge receiver id is the same as the user id 
        const receiverId = req.user._id; 

        const challenges = await Challenge.find({
            receiver: receiverId, 
            status: "pending", 
        }).populate("sender", "displayName")
        
        res.status(200).json(challenges); 
        
    } catch (error) {
        console.error("Error fetching challenges", error.message); 
        res.status(500).json({
            error: "Could not fetch pending challenges", 
        }); 
    }
}

// TODO: Add controller for accepting the challenge 


// Decline Challenge
const declineChallenge = async (req, res) => {
    try {
        const userId = req.user._id; 
        const {challengeId, challengerName} = req.body; 

        // console.log("Challenge ID:", challengeId)
        // console.log("Challenger Name:", challengerName) 

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({message: "User not found!"})
        } 

        const challenger = await User.findOne({displayName: challengerName})
        if(!challenger) {
            console.error("Challenger was not found")
            return res.status(404).json({message: "Could not find challenger!"}); 
        }
        
        const challengerEmail = challenger.email; 

        const challengeToDecline = await Challenge.findById(challengeId); 

        if(!challengeToDecline) {
            return res.status(404).json({message: "Challenge not found!"})
        }

        // DELETE THE CHALLENGE 
        await Challenge.findByIdAndDelete(challengeId); 

        // SEND EMAIL TO CHALLENGER 
        const emailSubject = `TT-Tabs: ${user.displayName} doesn't want to play with you. 🥲`
        const emailText = `Hey ${challenger.displayName}, your challenge has been declined.`
        const emailBody = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f9f9ff; border: 1px solid #ddd; border-radius: 10px;">
                <h1 style="text-align: center; color: #E11D48; margin-bottom: 10px;">🏓 TT-Tabs</h1>
                <h2 style="color: #4F46E5;">Challenge Declined 😕</h2>
                <p>Greetings <strong>${challenger.displayName}</strong>,</p>
                <p><strong>${user.displayName}</strong> has declined your challenge.</p>
                <p>Maybe they'll play with you some other time or you just need to make better friends. 🤷‍♂️</p>
                <p>My apologies 😔</p>
                <hr style="margin: 20px 0;" />
                <small style="color: gray;">This is an automated message from TT-Tabs. Please do not reply.</small>
            </div>
            `; 

        await sendEmail(
            challengerEmail, 
            emailSubject, 
            emailText, 
            emailBody,
        )

        return res.status(200).json({message: "Challenge has been declined and the email has been sent"}); 

        
    } catch (error) {
        // console.error("Could not decline challenge")
        return res.status(500).json({message: "Could not decline challenge"})
        
    }
}

module.exports = {sendChallenge, getPendingChallenges, declineChallenge}; 