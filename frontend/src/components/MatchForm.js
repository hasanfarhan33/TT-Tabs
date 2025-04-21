import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from 'axios'
import {motion, AnimatePresence} from "framer-motion"; 




const MatchForm = ({challenge, onClose}) => {

    const {user} = useAuthContext(); 

    const [matchSet, setMatchSet] = useState(0); 
    const [playerOneName, setPlayerOneName] = useState("")
    const [playerOneId, setPlayerOneId] = useState() 
    const [playerTwoName, setPlayerTwoName] = useState("")
    const [playerTwoId, setPlayerTwoId] = useState()
    const [scores, setScores] = useState([])
    const [winner, setWinner] = useState("")
    const [error, setError] = useState("")

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
                    console.error("Player data missing.");
                    setError("Could not fetch player names");
                }
            } catch (error) {
                console.error("Error fetching player info:", error);
                setError("Could not fetch player names");
            }
        };

        getPlayerNames();
       
    }, [challenge.bestOf, challenge.sender._id, user._id])


    // Log player names only when the state updates to avoid issues with null values
    useEffect(() => {
        console.log("Player One:", playerOneName, playerOneId);
        console.log("Player Two:", playerTwoName, playerTwoId);
    }, [playerOneName, playerOneId, playerTwoName, playerTwoId]);


    // TODO: FILL THIS
    const calculateWinner = () => {
        let p1Wins = 0; 
        let p2Wins = 0; 

        for (const set of scores) {
            if (set.p1 > set.p2) p1Wins++; 
            else if (set.p2 > set.p1) p2Wins++; 
        }


        return p1Wins > p2Wins ? playerOneId : playerTwoId; 

    }

    // TODO: FILL THIS
    const handleSubmit   = () => {
        const winnerId = calculateWinner();
        setWinner(winnerId) 

        console.log("Match Info:")
        console.log("Challenge ID:", challenge._id)
        console.log("Player 1:", playerOneName); 
        console.log("Player 2:", playerTwoName); 
        console.log("Best Of:", matchSet); 
        console.log("Scores:", scores); 
        console.log("Winner:", winnerId)

        onClose(); 

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-mont">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                    className="flex  flex-col justify-center  items-center bg-white p-8 rounded-xl w-[90%] max-w-md"
                >
                    <div>
                        <h1 className="font-funnel text-2xl font-semibold">
                            Match: {playerOneName || "Loading..."} VS {playerTwoName || "Loading..."}
                        </h1>
                        <p>Best of: {matchSet}</p>
                    </div>
    
                    {scores.map((score, index) => (
                        <div key={index} className="flex flex-col gap-2 mt-4">
                            <h3 className="font-semibold">Set {index + 1}</h3>
                            <div className="flex gap-4">
                                <div>
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
    
                                <div>
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
    
                    <button
                        onClick={handleSubmit}
                        className="mt-6 bg-bat-black text-white px-4 py-2 rounded-lg hover:bg-white hover:text-bat-black hover:ring-2 hover:ring-bat-black transition font-bold"
                    >
                        Submit Match Info
                    </button>
                    {error && <p className="text-button-primary mt-2">{error}</p>}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default MatchForm; 