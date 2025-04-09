const express = require("express"); 
const verifyToken = require("../middleware/authMiddleware") 
const {createUser, loginUser} = require("../controllers/userController");  

const router = express.Router(); 

// Create User
router.post("/create", createUser); 

// Login User
router.post("/login", loginUser); 

module.exports = router; 