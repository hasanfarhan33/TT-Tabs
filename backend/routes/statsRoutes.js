const express = require("express"); 
const router = express.Router();  
const {testRoute, getScoreDistribution, getTopFiveOpponents} = require("../controllers/statsController"); 

// TODO: ADD AUTHENTICATION LATER
router.get("/getScoreDistribution/:userId", getScoreDistribution); 
router.get("/getTopFiveOpponents/:userId", getTopFiveOpponents)

module.exports = router; 