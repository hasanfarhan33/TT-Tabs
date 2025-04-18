import React from "react";
import {motion, AnimatePresence} from 'framer-motion'; 
import { useAuthContext } from "../hooks/useAuthContext";

const StatsComponent = () => {

    const {user} = useAuthContext(); 

    return (
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
    )
}

export default StatsComponent; 