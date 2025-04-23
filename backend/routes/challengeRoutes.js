const express = require('express')
const router = express.Router(); 
const {sendChallenge, getPendingChallenges, declineChallenge, getChallenges, acceptChallenge, getOngoingChallenges, removeChallenge} = require("../controllers/challengeController")
const authMiddleware = require("../middleware/authMiddleware"); 

// SEND CHALLENGE 
router.get("/", getChallenges); 
router.post("/send", sendChallenge)
router.get("/pending", authMiddleware, getPendingChallenges); 
router.get("/ongoing", authMiddleware, getOngoingChallenges)
router.post("/decline", authMiddleware, declineChallenge)
router.post("/accept", authMiddleware, acceptChallenge); 
router.delete("/remove/:challengeId", removeChallenge); 

module.exports = router; 