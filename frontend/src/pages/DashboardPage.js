import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion } from "framer-motion";

import axios from 'axios'; 
import {toast} from 'react-hot-toast'


// Components
import HeaderComponent from "../components/HeaderComponent"; 
import ChallengeForm from "../components/ChallengeForm";

const DashboardPage = () => {
    // FOR AUTHORIZATION
    const {user} = useAuthContext();
    const config = {
        headers: {Authorization: `Bearer ${user.token}`}
    }
    
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

    // PENDING AND ONGOING CHALLENGES 
    const [pendingChallenges, setPendingChallenges] = useState([]); 
    const [ongoingChallenges, setOngoingChallenges] = useState([]); 

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * messages.length); 
        setWelcomeMessage(messages[randomIndex])
    }, [])

    // GETTING PENDING and ONGOING challenges 
    useEffect(() => {
        const getPendingChallenges = async () => {
            try {
                const pendingChallenges = await axios.get("/api/challenges/pending", config);

                setPendingChallenges(pendingChallenges.data); 
                console.log(pendingChallenges.data)
            } catch (error) {
                console.error("Could not fetch pending challenges", error.message); 
                // TODO: ADD AN ERROR MESSAGE STATE
            }
        }

        if(user) {
            getPendingChallenges(); 

        }

    }, [])

    const handleChallengeButton = () => {
        setShowChallengeForm(true); 
    }

    // TODO: FILL THIS FUNCTION
    const handleAcceptChallenge = () => {

    }

    // TODO: FILL THIS FUNCTION
    const handleDeclineChallenge = async (challenge) => {
    
        const challengeId = challenge._id; 
        const challengerName = challenge.sender.displayName;
        
        try {
            await axios.post("/api/challenges/decline", {challengeId, challengerName}, config)

            toast.success(`Challenge declined! Email sent to ${challengerName}`); 
            
            // Updating the UI
            setPendingChallenges(prev => prev.filter(c => c._id !== challengeId))

        } catch(error) {
            console.error("Could not decline challenge")
            toast.error("Failed to decline challenge!")
        }

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
                <motion.div className="flex flex-col gap-6 mb-8 rounded-lg w-full p-4 pb-8 bg-white border-2 border-b-4 border-bat-black hover:shadow-md transition-all" whileHover="hover">
                    <motion.h1
                        className="font-funnel text-2xl font-semibold relative w-fit cursor-default"
                    >
                        Stats
                        <motion.span
                        className="absolute left-0 -bottom-1 h-[2px] bg-bat-black"
                        variants={{
                            initial: { width: 0 },
                            hover: { width: "100%" },
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                    </motion.h1>
                    <motion.div
                        className="w-full grid grid-cols-2 items-center text-center gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <motion.p
                        className="text-lg text-bat-black"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                    >
                        Total Matches
                        </motion.p>
                        <motion.p
                            className="text-3xl font-bold"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            {user.totalMatches}
                        </motion.p>

                        <motion.p
                            className="text-lg text-bat-black"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                        >
                            Total Wins
                        </motion.p>
                        <motion.p
                            className="text-3xl font-bold"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                        >
                            {user.totalWins}
                        </motion.p>

                        <motion.p
                            className="text-lg text-bat-black"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                        >
                            Win Rate
                        </motion.p>
                        <motion.p
                            className="text-3xl font-bold"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.4 }}
                        >
                            {user.totalMatches > 0
                                ? `${Math.round((user.totalWins / user.totalMatches) * 100)}%`
                                : "0%"}
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* CHALLENGES */}
                <motion.div className="flex flex-col gap-6 mb-8 rounded-lg w-full p-4 pb-8 bg-white border-2 border-bat-black border-b-4 hover:shadow-md transition-all" whileHover="hover">
                    <motion.h1
                        className="font-funnel text-2xl font-semibold relative w-fit cursor-default"
                    >
                        Challenges
                        <motion.span
                        className="absolute left-0 -bottom-1 h-[2px] bg-bat-black"
                        variants={{
                            initial: { width: 0 },
                            hover: { width: "100%" },
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                    </motion.h1>

                    <div className="grid grid-cols-3 text-bat-black text-center">
                        <h3 className="font-funnel font-semibold text-lg underline">Challenger</h3>
                        <h3 className="font-funnel font-semibold text-lg underline">Sets</h3>
                        <h3 className="font-funnel font-semibold text-lg underline">Accept/Decline</h3>
                    </div>

                    {pendingChallenges.map((challenge) => (
                        <div key={challenge._id} className="grid grid-cols-3 items-center text-center text-lg">
                            <p className="text-bat-black">{challenge.sender.displayName}</p>
                            <p className="text-bat-black">{challenge.bestOf}</p>
                            <div className="flex items-center justify-center gap-4">
                                <button className="bg-bat-black font-semibold text-white px-2 rounded-lg hover:text-bat-black hover:bg-white hover:ring-2 hover:ring-bat-black transition" onClick={handleAcceptChallenge}>Accept</button>
                                <button className="bg-button-primary font-semibold text-white px-2 rounded-lg hover:text-button-primary hover:bg-white hover:ring-2 hover:ring-button-primary transition" onClick={() => handleDeclineChallenge(challenge)}>Decline</button>
                            </div>
                        </div>
                    ))}


                </motion.div>

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
