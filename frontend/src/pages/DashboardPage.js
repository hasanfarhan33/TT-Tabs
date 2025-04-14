import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion } from "framer-motion"; // Import motion

// Components
import HeaderComponent from "../components/HeaderComponent"; 
import ChallengeForm from "../components/ChallengeForm";

// TODO: Add stats into a div
// TODO: Add win / lose datapoint for each match


const DashboardPage = () => {
    const {user} = useAuthContext(); 
    const [welcomeMessage, setWelcomeMessage] = useState(""); 
    const messages = [
        "Ready to hit around the nets?", 
        "Let's smash some records today!", 
        "Every point counts - make it count!", 
        "Time to spin your way to victory!", 
        "Ready to be a pongstar?", 
        "Focus. Smash. Win. Repeat.", 
        "Keep your eye on the ball!", 
        "Practice like a champion!", 
        "You think you can be the next Timo Boll?", 
        "Spin it till you win it!", 
        "Every serve is a fresh start.", 
        "Chop, smash, and conquer!", 
        "Smash the ball like you smash your wife!", 
    ];

    const [showChallengeForm, setShowChallengeForm] = useState(false); 

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * messages.length); 
        setWelcomeMessage(messages[randomIndex])
    }, [])

    const handleChallengeButton = () => {
        setShowChallengeForm(true); 
    }

    const handlePreviousGamesButton = () => {
        console.log("You wanna see your previous games")
    }

    return (
        <>
            <HeaderComponent />
            <main className="p-8 font-mont bg-accent h-screen">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-funnel font-semibold text-bat-black">Welcome back, {user.displayName}!</h1>
                    <h3 className="text-2xl font-funnel text-bat-black">{welcomeMessage}</h3>
                </motion.div>

                {/* STATS */}
                <div className="flex flex-col gap-6 mb-8">
                    <motion.div
                        className="w-full flex items-center justify-center py-4 px-6 bg-white rounded-lg shadow-md gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <p className="text-lg text-bat-black">Total Matches</p>
                        <p className="text-3xl font-bold">{user.totalMatches}</p>
                    </motion.div>

                    <motion.div
                        className="w-full flex items-center justify-center py-4 px-6 bg-white rounded-lg shadow-md gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <p className="text-lg text-bat-black">Total Wins</p>
                        <p className="text-3xl font-bold">{user.totalWins}</p>
                    </motion.div>

                    <motion.div
                        className="w-full flex items-center justify-center py-4 px-6 bg-white rounded-lg shadow-md gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <p className="text-lg text-bat-black">Win Rate</p>
                        <p className="text-3xl font-bold">{user.totalMatches > 0 ? `${Math.round((user.totalWins / user.totalMatches) * 100)}%` : "0%"}</p>
                    </motion.div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col gap-4">
                    <motion.button
                        className="w-full bg-bat-black rounded-lg font-semibold shadow-md hover:bg-white hover:text-bat-black hover:ring-2 hover:ring-bat-black py-2 px-6 text-white transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleChallengeButton}
                    >
                        Challenge a Player!
                    </motion.button>
                    <motion.button
                        className="w-full bg-button-primary hover:bg-accent text-accent hover:text-button-primary hover:ring-2 hover:ring-button-primary py-2 px-6 rounded-lg font-bold transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePreviousGamesButton}
                    >
                        Match History
                    </motion.button>
                </div>

                {showChallengeForm && <ChallengeForm onClose={() => setShowChallengeForm(false)} />}
            </main>
        </>
    )
}

export default DashboardPage;
