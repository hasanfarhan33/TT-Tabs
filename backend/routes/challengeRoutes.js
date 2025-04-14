const express = require('express')
const router = express.Router(); 
const {sendChallenge} = require("../controllers/challengeController")

// SEND CHALLENGE 
router.post("/send", sendChallenge)

module.exports = router; 