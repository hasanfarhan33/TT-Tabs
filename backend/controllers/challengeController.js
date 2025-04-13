const mongoose = require("mongoose");
const Challenge = require("../models/Challenge")
const User = require('../models/User')
const sendEmail = require("../utils/sendEmail")

const createChallenge = async(req, res) => {
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

module.exports = {createChallenge}; 