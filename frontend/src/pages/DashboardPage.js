import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {motion, AnimatePresence} from "framer-motion"; 

// Components
import HeaderComponent from "../components/HeaderComponent"; 
import ChallengeForm from "../components/ChallengeForm";

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
    ]

    // Challenge form 
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
            <HeaderComponent></HeaderComponent>
            <main className="p-8 font-mont bg-alabaster h-screen">
                <div>
                    <h1 className="text-4xl font-bebas text-center">Welcome back, {user.displayName}!</h1>
                    <h3 className="text-2xl font-bebas text-center mb-8">{welcomeMessage}</h3>
                </div>

                {/* STATS */}
                <div className="grid grid-rows gap-12 mb-8">
                    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
                        <p className="text-3xl font-bold">{user.totalMatches}</p>
                        <p className="text-lg text-gray-600">Total Matches</p>
                    </div>

                    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
                        <p className="text-3xl font-bold">{user.totalWins}</p>
                        <p className="text-lg text-gray-600">Total Wins</p>
                    </div>

                    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
                        <p className="text-3xl font-bold">{user.totalMatches > 0 ? `${Math.round((user.totalWins / user.totalMatches) * 100)}%` : "0%"}</p>
                        <p className="text-lg text-gray-600">Win Rate</p>
                    </div>
                </div>
                
                <div className="flex flex-col gap-4">
                    <button className="bg-slate-50 font-bebas rounded-lg shadow-md hover:bg-slate-900 hover:text-white py-2 px-4 text-2xl transition" onClick={handleChallengeButton}>Challenge a Player!</button>
                    <button className="bg-slate-50 font-bebas rounded-lg shadow-md hover:bg-slate-900 hover:text-white py-2 px-4 text-2xl transition" onClick={handlePreviousGamesButton}>See Previous Games</button>   
                </div>

                
                {showChallengeForm && <ChallengeForm onClose={() => setShowChallengeForm(false)} />}

            </main>
        </>
    )
}

export default DashboardPage; 