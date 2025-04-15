const express = require('express')
const router = express.Router(); 
const {sendChallenge, getPendingChallenges, declineChallenge} = require("../controllers/challengeController")
const authMiddleware = require("../middleware/authMiddleware"); 

// SEND CHALLENGE 
router.post("/send", sendChallenge)
router.get("/pending", authMiddleware, getPendingChallenges); 
router.post("/decline", authMiddleware, declineChallenge)

module.exports = router; 