import React, { useEffect, useState } from "react"; 
import axios from "axios";

// A Context
const ChallengeContext = React.createContext(); 

// A Provider 
function ChallengeContextProvider({children, userId, bearerToken}) {
    const [ongoingChallenges, setOngoingChallenges] = useState([])
    const [pendingChallenges, setPendingChallenges] = useState([])
    const [error, setError] = useState(""); 

    const config = {
        headers: {Authorization: `Bearer ${bearerToken}`}
    }

    const fetchOngoingChallenges = async () => {
        if(!userId) return; 
        
        try {
            // Fetching the ongoing challenges 
            const resOngoingChallenges = await axios.get("/api/challenges/ongoing", config)
            setOngoingChallenges(resOngoingChallenges.data)
        } catch (error) {
            console.error("Could not fetch ongoing challenges in ChallengeContext"); 
            setError("Could not fetch ongoing challenges!"); 
        }
    }

    const fetchPendingChallenges = async () => {
        if(!userId) return; 
        
        try {
            const pendingChallenges = await axios.get("/api/challenges/pending", config) 
            setPendingChallenges(pendingChallenges.data); 
        } catch (error) {
            console.error("Could not fetch pending challenges in ChallengeContext")
            setError("Could not fetch pending challenges!")
        }
    }

    // Handle Accept Challenge 
    const handleAcceptChallenge = async (challenge) => {
        const challengeId = challenge._id; 
        const challengerName = challenge.sender.displayName; 

        try {
            await axios.post("/api/challenges/accept", {challengeId, challengerName}, config) 

            setPendingChallenges((prevChallenges) => prevChallenges.filter((chal) => chal._id !== challengeId));    // Remove the accepted challenge
            setOngoingChallenges((prevChallenges) => [
                ...prevChallenges, 
                {...challenge, status: 'ongoing'},  // Add to ongoing challenges 
            ])
            

        } catch (error) {
            // console.error("Failed to accept challenge!")
            setError("Could not accept challenge!")
        }

    }

    // Handle Decline Challenge
    const handleDeclineChallenge = async (challenge) => {
    
        const challengeId = challenge._id; 
        const challengerName = challenge.sender.displayName;
        
        try {
            await axios.post("/api/challenges/decline", {challengeId, challengerName}, config)
            
            // Updating the UI
            setPendingChallenges(prev => prev.filter(c => c._id !== challengeId))

        } catch(error) {
            setError("Could not decline challenge!")
        }

    }

    const finishChallenge = (challenge) => {
        setOngoingChallenges((prevChallenges) => prevChallenges.filter((c) => c._id !== challenge._id))
    };

    useEffect(() => {
        if(userId && bearerToken) {

            fetchOngoingChallenges(); 
            fetchPendingChallenges(); 
        }
    }, [userId, bearerToken])


    return (
        <ChallengeContext.Provider value={{ongoingChallenges, pendingChallenges, handleAcceptChallenge, handleDeclineChallenge, finishChallenge, error}}>
            {children}
        </ChallengeContext.Provider>
    )
}

export {ChallengeContext, ChallengeContextProvider as ChallengeProvider}
