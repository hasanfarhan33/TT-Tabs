import React from "react";
import {useNavigate} from 'react-router-dom'; 
import {motion, AnimatePresence} from 'framer-motion'; 
import { useAuthContext } from "../hooks/useAuthContext";


// TODO: CREATE STATS CONTEXT SO THEY UPDATE AUTOMATICALLY
const StatsComponent = () => {

    const {user} = useAuthContext(); 

    let navigate = useNavigate(); 
    const handleSeeMoreStats = () => {
        navigate("/statsPage"); 
    }

    return (
        <motion.div className="flex flex-col gap-6 mb-8 rounded-lg w-full p-4 pb-8 bg-white border-2 border-b-4 border-bat-black hover:shadow-md transition-all" whileHover="hover">
                    <motion.h1
                        className="font-funnel text-2xl font-semibold relative w-fit cursor-default"
                    >
                        Stats
                        <motion.span
                        className="absolute left-0 bottom-1 h-[2px] bg-bat-black"
                        variants={{
                            initial: { width: 0 },
                            hover: { width: "100%" },
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                    </motion.h1>
                    <div className="w-full grid grid-cols-2 items-center text-center gap-4">
                        <p className="text-lg text-bat-black">Total Matches</p>
                        <p className="text-3xl font-bold">{user.totalMatches}</p>

                        <p className="text-lg text-bat-black">Total Wins</p>
                        <p className="text-3xl font-bold">{user.totalWins}</p>

                        <p className="text-lg text-bat-black">Win Rate</p>
                        <p className="text-3xl font-bold">
                            {user.totalMatches > 0
                                ? `${Math.round((user.totalWins / user.totalMatches) * 100)}%`
                                : "0%"}
                        </p>
                    </div>

                    <button onClick={handleSeeMoreStats} className="px-4 py-2 bg-bat-black font-bold text-white rounded-lg hover:bg-white hover:ring-2 hover:ring-bat-black hover:text-bat-black transition-all">See More Stats!</button>
                </motion.div>
    )
}

export default StatsComponent; 