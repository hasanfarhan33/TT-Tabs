import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion } from "framer-motion";


// Components
import HeaderComponent from "../components/HeaderComponent"; 
import ChallengeForm from "../components/ChallengeForm";
import StatsComponent from "../components/StatsComponent";
import ChallengesComponent from "../components/ChallengesComponent";

const DashboardPage = () => {
    // FOR AUTHORIZATION
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

    // Randomly choosing a welcome message
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
                <StatsComponent></StatsComponent>
                

                {/* CHALLENGES */}
                <ChallengesComponent></ChallengesComponent>

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
