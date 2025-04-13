import React from "react";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleRoute = (path) => {
    navigate(path);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-slate-50 px-4 font-mont">
      <div className="text-center mb-8">
        <h1 className="text-8xl text-black mb-4 font-bebas">TT-Tabs 🏓</h1>
      </div>

      <div className="mb-8">
        <motion.ul 
          className="space-y-4 text-lg text-gray-800"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <motion.li 
            className="flex items-center gap-2 font-semibold text-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-orange-500">⚡</span> Keep track of your previous games!
          </motion.li>
          <motion.li 
            className="flex items-center gap-2 font-semibold text-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-red-500">🏓</span> Challenge others to a match! (best of 1, 3, and 5)
          </motion.li>
        </motion.ul>
      </div>

      <div className="flex gap-6">
        <motion.button
          className="px-6 py-2 bg-slate-900 text-white font-bold rounded-2xl text-lg shadow-md transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleRoute("/login")}
        >
          Login
        </motion.button>
        <motion.button
          className="px-6 py-2 bg-red-500 text-white font-bold rounded-2xl text-lg shadow-md transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleRoute("/register")}
        >
          Register
        </motion.button>
      </div>
    </main>
  );
};

export default WelcomePage;
