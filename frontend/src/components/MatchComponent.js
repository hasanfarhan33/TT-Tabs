import React, { useEffect, useState } from "react";
import {motion} from "framer-motion"; 
import { useAuthContext } from "../hooks/useAuthContext";
import axios from 'axios';


const MatchComponent = () => {

    const {user} = useAuthContext(); 

    const [matches, setMatches] = useState([]); 

    // Get the previous 5 matches
    useEffect(() => {
        const getPreviousThreeMatches = async () => {
            try {
                const userId = user._id; 
                const previousMatches = await axios.get(`/api/matches/getAll/${userId}`)
                console.log(previousMatches.data); 

                // If the array is smaller than 5 --> preview all the matches 
                if (previousMatches.data.length < 3) {
                    setMatches(previousMatches.data); 
                } else {
                    setMatches(previousMatches.data.slice(0, 3)); 
                }



            } catch (error) {
                console.error("Could not fetch previous matches", error.message); 
            }
        }

        getPreviousThreeMatches(); 
    }, [user._id]) 

    // TODO: FILL THIS FUNCTION!
    const handleSeeAllMatches = () => {

    }

    return (
        <motion.div className="flex flex-col gap-6 mb-8 rounded-lg w-full p-4 pb-8 bg-white border-2 border-bat-black border-b-4 hover:shadow-md transition-all" whileHover="hover">
            <motion.h1 className="font-funnel text-2xl font-semibold relative w-fit cursor-default">Matches
            <motion.span 
            className="absolute left-0 bottom-1 h-[2px] bg-bat-black"
            variants={{
                initial: {width: 0}, 
                hover: {width: "100%"}
            }}
            transition={{duration: 0.3, ease: "easeInOut"}}
            />    
            </motion.h1>
            <p>Here are your last 3 matches!</p>   
            
            {/* DISPLAYING THE MATCHES */}
            <div>
                {matches.length > 0 ? matches.map((match) => (
                    <div className="flex flex-col border-2 border-bat-black border-b-4 mb-4 rounded-lg p-4 hover:shadow-md transition-all" key={match._id}>
                        <div className="grid grid-cols-3 mb-4 font-funnel font-semibold underline">
                            {match.player1._id === user._id ? (
                                <h3>You VS {match.player2.displayName}</h3>
                                ) : 
                                (
                                    <h3>{match.player1.displayName} VS You</h3>
                                )}

                                <h3>Best Of: {match.bestOf}</h3>
                                <h3>Date: {new Date(match.matchDate).toLocaleDateString('es-pa')}</h3>
                        </div>
                        <div className="flex flex-col gap-4">
                            {match.scores.map((score, index) => (
                                <div className="flex flex-col gap-4">
                                    <h3 className="font-funnel font-semibold">Set {index + 1}</h3>
                                    <div className="grid grid-cols-3 text-center">
                                        <p>You: <span className="font-funnel font-semibold">{score.player1Score}</span></p>
                                        <p>{match.player2.displayName}: <span className="font-funnel font-semibold">{score.player2Score}</span></p>
                                        {score.player1Score >= 11 ? (<p className="font-semibold text-green-700">W</p>) : (<p className="font-semibold text-button-primary">L</p>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {match.winner === user._id ? (<h3 className="font-funnel font-semibold text-center mt-8">Winner: <span className="text-green-700">{match.player1.displayName}</span></h3>) : (<h3 className="font-funnel font-semibold text-center mt-8">Winner: <span className="text-button-primary">{match.player2.displayName}</span></h3>)}
                    </div>
                )) : (
                    <div>
                        <p className="text-center">No matches available 😟.</p>
                    </div>
                )}
            </div>
            <button onClick={handleSeeAllMatches} className="px-4 py-2 bg-bat-black font-bold text-white rounded-lg hover:bg-white hover:ring-2 hover:ring-bat-black hover:text-bat-black transition-all">See All Matches</button>
        </motion.div>
    )
}

export default MatchComponent; 

