import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion } from "framer-motion";

import { useChallengeContext } from "../hooks/useChallengeContext";


// Components
import HeaderComponent from "../components/HeaderComponent"; 
import ChallengeForm from "../components/ChallengeForm";
import MatchForm from "../components/MatchForm";
import StatsComponent from "../components/StatsComponent";
import ChallengesComponent from "../components/ChallengesComponent";
import MatchComponent from "../components/MatchComponent";

// TODO: MAKE SURE THE USER CAN"T SEND A CHALLENGE TO HIMSELF / HERSELF
const DashboardPage = () => {
    // FOR AUTHORIZATION
    const {user} = useAuthContext();
    const {finishChallenge} = useChallengeContext(); 
    
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

    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [showMatchForm, setShowMatchForm] = useState(false);

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

    const handleFinishChallenge = (challenge) => {
        finishChallenge(challenge); 
        setSelectedChallenge(challenge); 
        setShowMatchForm(true); 
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
                <ChallengesComponent onFinishChallenge={handleFinishChallenge}></ChallengesComponent>

                {/* MATCHES */}
                <MatchComponent></MatchComponent>

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
                </div>

                {showMatchForm && selectedChallenge && (
                    <MatchForm
                        challenge={selectedChallenge}
                        onClose={() => {
                            setShowMatchForm(false);
                            setSelectedChallenge(null);
                        }}
                    />
                )}

                {showChallengeForm && <ChallengeForm onClose={() => setShowChallengeForm(false)} />}
            </main>
        </>
    )
}

export default DashboardPage;
