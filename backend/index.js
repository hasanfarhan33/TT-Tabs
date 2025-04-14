const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const userRoutes = require("./routes/userRoutes")
const challengeRoutes = require("./routes/challengeRoutes"); 

// Connect to DB 
connectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method); 
  next(); 
})

// Basic route
app.get('/', (req, res) => {
  res.send('TT-Tabs API is running');
});

// Routes 
app.use("/api/auth", userRoutes); 
app.use("/api/challenges", challengeRoutes)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
