const express = require('express')
const router = express.Router(); 
const {createChallenge} = require("../controllers/challengeController")

// SEND CHALLENGE 
router.post("/create", createChallenge)

module.exports = router; 