const admin = require("firebase-admin"); 

if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(), 
    }); 
}

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization; 

    if(!authHeader || !authHeader.startsWith(`Bearer `)) {
        return res.status(401).json({message: "No token provided"}); 
    }

    const token = authHeader.split(" ")[1]; 

    // Try to decode the token 
    try {
        const decodedToken = await admin.auth().verifyToken(token); 
        req.user = {
            uid: decodedToken.uid, 
            email: decodedToken.email,
        }; 

        next(); 
    } catch (error) {
        console.error("Token verification failed:", error.message); 
        return res.status(401).json({message: "Invalid Token!"})
    }
}

module.exports = verifyToken; 