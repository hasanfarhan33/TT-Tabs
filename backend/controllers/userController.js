const User = require("../models/User")

// Create User 
const createUser = async (req, res) => {
    const {uid, email} = req.user; 
    const {displayName} = req.body; 

    try {
        // Check if the user exists 
        const existingUser = await User.findOne({uid})
        if(existingUser) {
            res.status(400).json({message: "User already exists!"});  
        }

        const user = new User({
            uid, 
            email, 
            displayName, 
        })

        await user.save(); 
        res.status(200).json({message: "User created successfully!"});

    } catch (error) {
        res.status(500).json({error: error.message}); 
    }
}

// Get User
const getUser = async (req, res) => {
    const {uid} = req.params; 
    try {
        const user = await User.findOne({uid}); 

        if(!user) {
            res.status(404).json({error: "User not found!"})
        }

        res.status(200).json(user);    
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

module.exports = {createUser, getUser, deleteUser}; 
