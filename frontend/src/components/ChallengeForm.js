import { useEffect, useState } from "react";
import {motion, AnimatePresence} from "framer-motion"; 
import { useAuthContext } from "../hooks/useAuthContext";
import axios from 'axios'; 
import {toast} from 'react-hot-toast'

const ChallengeForm = ({ onClose }) => {
    const {user} = useAuthContext(); 
    const [receiverName, setReceiverName] = useState(""); 
    const [receiverId, setReceiverId] = useState(null)
    const [bestOf, setBestOf] = useState(3); 

    const [allUsers, setAllUsers] = useState([]); 
    const [filteredUsers, setFilteredUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false); 
     

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const res = await axios.get("/api/auth/all")
                setAllUsers(res.data); 
            } catch (error) {
                console.error(error)
            }
        }

        fetchUsers(); 
    }, [])

    const handleInputChange = (e) => {
        const value = e.target.value; 
        setReceiverName(value); 

        const suggestions = allUsers.filter(user => user.displayName.toLowerCase().includes(value.toLowerCase())); 

        setFilteredUsers(suggestions); 
    }

    const handleSelectUser = (selectedUser) => {
        setReceiverName(selectedUser.displayName);
        setReceiverId(selectedUser._id);  
        setFilteredUsers([]); 

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!receiverId) {
            alert("Please select a player from the list")
            return; 
        }

        setIsLoading(true); 
        
        try {
            await axios.post("/api/challenges/send", {
                senderId: user._id,
                receiverName: receiverName, 
                bestOf: bestOf,
            }); 

            toast.success("Challenge Sent!")
            onClose(); 

        } catch (error) {
            console.error(error.message)
            toast.error("Failed to send challenge!")
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-mont">
        <AnimatePresence>
            <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="bg-alabaster p-8 rounded-xl w-[90%] max-w-md"
            >
            <h2 className="text-4xl font-bebas mb-4 text-center">Challenge a Player!</h2>

            <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
                <label className="col-span-2 block font-bold">Player Name</label>
                <input
                type="text"
                value={receiverName}
                onChange={handleInputChange}
                className="col-span-2 w-full mt-1 p-2 border rounded"
                required
                />
                {/* Suggestions */}
                {filteredUsers.length > 0 && (
                <div className="col-span-2 bg-white border rounded mt-1 max-h-40 overflow-y-auto">
                    {filteredUsers.map(user => (
                    <div
                        key={user._id}
                        onClick={() => handleSelectUser(user)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                        {user.displayName}
                    </div>
                    ))}
                </div>
                )}

                <label className="col-span-2 block font-bold">Best of</label>
                <select
                value={bestOf}
                onChange={(e) => setBestOf(Number(e.target.value))}
                className="col-span-2 w-full mt-1 p-2 border rounded"
                required
                >
                <option value={1}>1</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
                </select>

                <button
                type="submit"
                className="col-span-1 mt-4 px-4 py-2 bg-slate-900 text-white rounded hover:text-slate-900 hover:ring-slate-900 hover:ring-2 hover:bg-slate-50 transition font-bold"
                >
                {isLoading ? "Challenging" : "Challenge"}
                </button>
                <button
                type="button"
                onClick={onClose}
                className="col-span-1 mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition font-bold"
                >
                Cancel
                </button>
            </form>
            </motion.div>
        </AnimatePresence>
        </div>
    );
};

export default ChallengeForm;
