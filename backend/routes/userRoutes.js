const express = require("express"); 
const verifyToken = require("../middleware/authMiddleware") 
const {createUser, loginUser, getAllUsers, getUserById} = require("../controllers/userController");  

const router = express.Router(); 

// Create User
router.post("/create", createUser); 

// Login User
router.post("/login", loginUser); 

// Get all users 
router.get("/all", getAllUsers)

// Get user by id 
router.get("/:id", getUserById); 


module.exports = router; 