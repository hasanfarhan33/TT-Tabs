import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from 'axios'
import {motion, AnimatePresence} from "framer-motion"; 
import {toast} from 'react-hot-toast'
import Confetti from 'react-confetti-boom'


// TODO: MAKE SURE THAT THE CHALLENGES COMPONENT GETS UPDATED ONCE THE SCORES ARE SUBMITTED TO DB
const MatchForm = ({challenge, onClose}) => {

    const {user} = useAuthContext(); 

    const [matchSet, setMatchSet] = useState(0); 
    const [playerOneName, setPlayerOneName] = useState("")
    const [playerOneId, setPlayerOneId] = useState() 
    const [playerTwoName, setPlayerTwoName] = useState("")
    const [playerTwoId, setPlayerTwoId] = useState()
    const [scores, setScores] = useState([])
    const [winner, setWinner] = useState("")
    const [showConfetti, setShowConfetti] = useState(false); 
    // const [error, setError] = useState("")

    // Adding information to the variables to create match form 
    
    // RECEIVER ID AND USER ID ARE THE SAME
    // SENDER ID IS THE ID OF PLAYER TWO
    
    useEffect(() => {
        // Determining the set
        setMatchSet(challenge.bestOf)
        // This fills the array with size of challenge.bestOf --> BEST OF 3 ARRAY: [{p1: 0, p2: 0}, {p1: 0, p2: 0}, {p1: 0, p2: 0}]
        setScores(Array(challenge.bestOf).fill({p1: 0, p2: 0}))

        const getPlayerNames = async () => {
            try {
                const firstPlayerResponse = await axios.get(`/api/auth/${user._id}`);
                const secondPlayerResponse = await axios.get(`/api/auth/${challenge.sender._id}`);

                if (firstPlayerResponse.data && secondPlayerResponse.data) {
                    setPlayerOneName(firstPlayerResponse.data.displayName)
                    setPlayerOneId(firstPlayerResponse.data._id)
                    setPlayerTwoName(secondPlayerResponse.data.displayName)
                    setPlayerTwoId(secondPlayerResponse.data._id)
                } else {
                    toast.error("Could not fetch player names"); 
                    console.error("Player data missing.");
                }
            } catch (error) {
                toast.error("Could not fetch player names!")
                console.error("Error fetching player info:", error);
            }
        };

        getPlayerNames();
       
    }, [challenge.bestOf, challenge.sender._id, user._id])


    // Log player names only when the state updates to avoid issues with null values
    useEffect(() => {
        console.log("Player One:", playerOneName, playerOneId);
        console.log("Player Two:", playerTwoName, playerTwoId);
    }, [playerOneName, playerOneId, playerTwoName, playerTwoId]);


    const isValidSet = (set) => {
        const {player1Score, player2Score} = set;
        
        // If both players are more than or equal to 11 --> check for two point difference 
        if (player1Score >= 11 && player2Score >= 11) {
            const difference = Math.abs(player1Score - player2Score) 
            if (difference >= 2) {
                return true; 
            }
        }

        // If either of the scores are more than 11 but the other score is less than 11 
        if ((player1Score > 11 && player2Score < 11) || (player1Score < 11 && player2Score > 11)) {
            return false; 
        }
        
        // If either of the players have a score of more than or equal to 11 
        if ((player1Score >= 11 && player2Score < 11) || (player1Score < 11 && player2Score >= 11)) {
            return true;
        }

        return false; 
    }


    const calculateWinner = (scores) => {
        let p1Wins = 0; 
        let p2Wins = 0; 
        
        for(const set of scores) {
            if(set.player1Score > set.player2Score) p1Wins++; 
            else if(set.player2Score > set.player1Score) p2Wins++; 
        }
        
        return p1Wins > p2Wins ? playerOneId : playerTwoId; 

    }

    const handleSubmit = async () => {
        const filteredScores = [] 
        for (const set of scores) {
            if(set.p1 === 0 && set.p2 === 0) {
                continue
            } else {
                filteredScores.push({player1Score: set.p1, player2Score: set.p2}); 
            }
        } 

        

        // CHECKING VALIDITY OF SCORES 
        for (const set of filteredScores) {
            if(!isValidSet(set)) {
                toast.error("Scores aren't valid!")
                return; 
            }
        }

        // CHECKING THE LENGTH OF SCORES 
        const requiredWins = Math.ceil(matchSet / 2); 
        let playerOneWins = 0; 
        let playerTwoWins = 0; 
        for (const set of filteredScores) {
            if(set.player1Score > set.player2Score) playerOneWins++; 
            else if(set.player2Score > set.player1Score) playerTwoWins++; 
        }

        if(playerOneWins > requiredWins || playerTwoWins > requiredWins) {
            toast.error("Too many scores!")
            return; 
        } else if ((playerOneWins < requiredWins && playerTwoWins < requiredWins) || 
                    (playerOneWins === requiredWins && playerTwoWins === requiredWins)) {
                        toast.error("Not enough scores!")
                        return; 
                 }
            else {
                const winnerId = calculateWinner(filteredScores); 
                setWinner(winnerId); 
                const matchData = {
                    challengeId: challenge._id, 
                    playerOne: playerOneId, 
                    playerTwo: playerTwoId, 
                    scores: filteredScores, 
                    bestOf: matchSet, 
                    winner: winnerId, 
                }

                console.log("match data: ", matchData)

                // console.log("Scores: ", scores)
                console.log("Filtered Scores: ", filteredScores)

                const toastId = toast.loading("Submitting Match Info...")
    
                // ADDING THE MATCH INFO INTO THE DATABASE 
                try {
                    await axios.post("/api/matches/create", matchData, {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    })
        
                    toast.success("Match Info Saved!", {id: toastId})
        
                    if(winnerId === user._id) {
                        setShowConfetti(true); 
                        setTimeout(() => {onClose()}, 3000)
                    } else {
                        onClose(); 
                    }
                    
                } catch (error) {
                    console.error("Could not add match info", error.message)
                    toast.error("Could not save match info!")
                }
            }

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-mont">
            {showConfetti && (
                <div className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none">
                    <Confetti x={0.1} y={0.9} particleCount={50} deg={315} spreadDeg={40} />
                    <Confetti x={0.9} y={0.9} particleCount={50} deg={200} spreadDeg={40} />
                </div>
            
                )}
            <AnimatePresence>
                {playerOneName && playerTwoName ? (
                    <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                    className="flex  flex-col justify-center  items-center bg-white p-8 rounded-xl w-[90%] max-w-md"
                >
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="font-funnel text-2xl font-semibold">
                            Match: {playerOneName || "Loading..."} VS {playerTwoName || "Loading..."}
                        </h1>
                        <p>Best of: {matchSet}</p>
                    </div>
    
                    {scores.map((score, index) => (
                        <div key={index} className="flex flex-col gap-2 mt-4">
                            <h3 className="font-semibold underline">Set {index + 1}</h3>
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center gap-2">
                                    <label>{playerOneName}</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={score.p1}
                                        className="border rounded-lg px-3 py-1 w-20 text-center"
                                        onChange={(e) => {
                                            const newScores = [...scores];
                                            newScores[index] = { ...newScores[index], p1: Number(e.target.value) };
                                            setScores(newScores);
                                        }}
                                    />
                                </div>
    
                                <div className="flex items-center justify-center gap-2">
                                    <label>{playerTwoName}</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={score.p2}
                                        className="border rounded-lg px-3 py-1 w-20 text-center"
                                        onChange={(e) => {
                                            const newScores = [...scores];
                                            newScores[index] = { ...newScores[index], p2: Number(e.target.value) };
                                            setScores(newScores);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* BUTTONS */}
                    <div className="flex gap-2 items-center justify-center mb-4">
                        <button
                            onClick={handleSubmit}
                            className="mt-6 bg-bat-black text-white px-4 py-2 rounded-lg hover:bg-white hover:text-bat-black hover:ring-2 hover:ring-bat-black transition font-bold"
                        >
                            Submit Match Info
                        </button>
                        <button onClick={onClose} className="mt-6 bg-button-primary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-button-primary hover:ring-2 hover:ring-button-primary transition font-bold">Cancel</button>

                    </div>
                </motion.div>
                 ) : (
                    <div className="flex bg-white p-10 rounded-lg">
                        <p className="text-center justify-center items-center font-semibold">Loading...</p>
                    </div>
                 )}
                
            </AnimatePresence>
        </div>
    );
}

export default MatchForm; 