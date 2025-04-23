const express = require("express"); 
const router = express.Router();  
const { createMatch } = require("../controllers/matchController");

const authMiddleware = require("../middleware/authMiddleware"); 



// CREATE MATCH 
router.post("/create", authMiddleware, createMatch)

module.exports = router; 