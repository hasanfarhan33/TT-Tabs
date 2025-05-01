import React, { useEffect, useState } from "react";
import {motion} from "framer-motion"; 
import { useAuthContext } from "../hooks/useAuthContext";
import axios from 'axios';
import {toast} from 'react-hot-toast'
import {Check, X} from 'lucide-react'; 

import { useChallengeContext } from "../hooks/useChallengeContext";

const ChallengesComponent = ({onFinishChallenge}) => {

    const {ongoingChallenges, pendingChallenges, handleAcceptChallenge, handleDeclineChallenge, error,} = useChallengeContext(); 

    const [activeTab, setActiveTab] = useState("pending"); 

    // Handle accept challenge 
    const handleAccept = async (challenge) => {
        try {
            const toastId = toast.loading("Accepting Challenge...")
            await handleAcceptChallenge(challenge); 
            toast.success("Challenge Accepted!", {id: toastId})
        } catch (error) {
            toast.error("Failed to accept challenge!")
        }
    }

    const handleDecline = async (challenge) => {
        try {
            const toastId = toast.loading("Declining Challenge...")
            await handleDeclineChallenge(challenge); 
            toast.success("Challenge Declined!", {id: toastId})
        } catch (error) {
            toast.error("Failed to decline challenge!")
        }
    }

    useEffect(() => {
        if(error) {
            toast.error(error); 
        }
    }, [error])

    const handleFinishChallenge = (challenge) => {
        if (onFinishChallenge) {
            onFinishChallenge(challenge);
        }
    };

    // TODO: ADD A LOADING ANIMATION HERE
    return (
        <motion.div className="flex flex-col gap-6 mb-8 rounded-lg w-full p-4 pb-8 bg-white border-2 border-bat-black border-b-4 hover:shadow-md transition-all" whileHover="hover">
                    <motion.h1
                        className="font-funnel text-2xl font-semibold relative w-fit cursor-default"
                    >
                        Challenges
                        <motion.span
                        className="absolute left-0 bottom-1 h-[2px] bg-bat-black"
                        variants={{
                            initial: { width: 0 },
                            hover: { width: "100%" },
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                    </motion.h1>

                    {/* TAB BUTTONS */}
                    <div className="flex mb-6 justify-center gap-2">
                        <button onClick={() => setActiveTab('pending')}className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'pending' ? 'bg-bat-black text-white' : 'bg-white ring-2 ring-bat-black text-bat-black'}`}>⌛Pending</button>
                        <button onClick={() => setActiveTab('ongoing')} className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'ongoing' ? 'bg-bat-black text-white' : 'bg-white ring-2 ring-bat-black text-bat-black'}`}>🔥Ongoing</button>
                    </div>

                    <div className="grid grid-cols-3 text-bat-black text-center">
                        <h3 className="font-funnel font-semibold text-lg underline">Challenger</h3>
                        <h3 className="font-funnel font-semibold text-lg underline">Sets</h3>
                        {activeTab === 'pending' ? (<h3 className="font-funnel font-semibold text-lg underline">Accept/Decline</h3>) : (<h3 className="font-funnel font-semibold text-lg underline">Finish</h3>)}
                    </div>
                    
                    {activeTab === 'pending' && (
                        pendingChallenges.length > 0 ? (
                            pendingChallenges.map((challenge) => (
                                <div key={challenge._id} className="grid grid-cols-3 items-center text-center text-lg">
                                    <p className="text-bat-black">{challenge.sender.displayName}</p>
                                    <p className="text-bat-black">{challenge.bestOf}</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            className="bg-bat-black font-semibold text-white px-2 py-2 rounded-lg hover:text-bat-black hover:bg-white hover:ring-2 hover:ring-bat-black transition"
                                            onClick={() => handleAccept(challenge)}
                                        >
                                            <Check size={20} strokeWidth={4}></Check>
                                        </button>
                                        <button
                                            className="bg-button-primary font-semibold text-white px-2 py-2 rounded-lg hover:text-button-primary hover:bg-white hover:ring-2 hover:ring-button-primary transition"
                                            onClick={() => handleDecline(challenge)}
                                        >
                                            <X size={20} strokeWidth={4}></X>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No Pending Challenges 😟</p>
                        )
                    )}

                    {activeTab === 'ongoing' && (ongoingChallenges.length > 0 ? (
                        ongoingChallenges.map((challenge) => (
                            <div key={challenge._id} className="grid grid-cols-3 items-center text-center text-lg">
                                <p className="text-bat-black">{challenge.sender.displayName}</p>
                                <p className="text-bat-black">{challenge.bestOf}</p>
                                <button className="bg-button-primary font-semibold text-white mx-6 rounded-lg hover:text-button-primary hover:bg-white hover:ring-2 hover:ring-button-primary transition" onClick={() => handleFinishChallenge(challenge)}>Finish</button>
                            </div>
                        ))
                    ) : (<p className="text-center">No Ongoing Challenges 😟</p>))}
                    
                </motion.div>
    ); 
}

export default ChallengesComponent; 