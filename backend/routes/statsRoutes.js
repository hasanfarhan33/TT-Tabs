const express = require("express"); 
const router = express.Router();  
const {getWinRate, getScoreDistribution, getTopFiveOpponents} = require("../controllers/statsController"); 

// TODO: ADD AUTHENTICATION LATER
router.get("/getWinRate/:userId", getWinRate)
router.get("/getScoreDistribution/:userId", getScoreDistribution); 
router.get("/getTopFiveOpponents/:userId", getTopFiveOpponents)

module.exports = router; 