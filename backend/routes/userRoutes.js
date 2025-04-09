const express = require("express"); 
const verifyToken = require("../middleware/authMiddleware") 
const {createUser, getUser, deleteUser} = require("../controllers/userController");  

const router = express.Router(); 

// Create User
router.post("/create", verifyToken, createUser); 

// Get User 
router.get("/:uid", getUser); 

// Delete User 
// TODO: Add verify token later
router.delete("/:uid", deleteUser); 


module.exports = router; 