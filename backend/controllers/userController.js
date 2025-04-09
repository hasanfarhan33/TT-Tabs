const User = require("../models/User")
const jwt = require("jsonwebtoken")

require('dotenv').config(); 


const createToken = (_id) => {
    if(!process.env.SECRET) {
        throw new Error("Secret key not found in environment variables")
    }
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'}); 
}

// Create User 
const createUser = async (req, res) => {
    const {displayName, email, password} = req.body; 

    try {
        const user = await User.register(displayName, email, password) 

        // Create token 
        const token = createToken(user._id); 

        res.status(201).json({
            _id: user.id, 
            displayName: user.displayName, 
            email: user.email, 
            totalWins: user.totalWins, 
            totalMatches: user.totalMatches, 
            token: token 
        })

    } catch (error) {
        res.status(500).json({error: error.message}); 
    }
}

// Get User
const loginUser = async (req, res) => {
    const {email, password} = req.body; 
    
    try {
        const user = await User.login(email, password) 
        const token = createToken(user._id)
        
        res.status(200).json({
            _id: user._id, 
            displayName: user.displayName, 
            email: user.email, 
            totalWins: user.totalWins, 
            totalMatches: user.totalMatches, 
            token: token
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
     
}

// Delete User 
const deleteUser = async(req, res) => {
    const {uid} = req.params; 
    try {
        const user = await User.findOneAndDelete({uid}); 
        if (!user) {
            res.status(404).json({error: "User not found!"})
        }
        res.staus(200).json({message: "User deleted successfully", deletedUser: user});
    } catch (error) {
        res.status(500).json({error: `Could not delete user: ${error.message}`}); 
    }
}

module.exports = {createUser, loginUser}; 
