const express = require("express"); 
const router = express.Router();  
const { createMatch, getAllMatches, removeMatch } = require("../controllers/matchController");

const authMiddleware = require("../middleware/authMiddleware"); 



// CREATE MATCH 
router.post("/create", authMiddleware, createMatch)
router.get("/getAll/:userId", getAllMatches)
router.delete("/remove/:matchId", removeMatch)

module.exports = router; 