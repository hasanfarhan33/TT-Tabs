import React from "react";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client"

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleRoute = (path) => {
    navigate(path);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-slate-50">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-black mb-4">Welcome to TT-Tabs</h1>
        <h3 className="text-xl text-red-600 font-bold">Keep Tabs on your Table Tennis Games</h3>
      </div>

      <div className="flex gap-6">
        <motion.button
          className="px-6 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-2xl text-lg shadow-md transition"
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          onClick={() => handleRoute("/login")}
        >
          Login
        </motion.button>
        <motion.button
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl text-lg shadow-md transition"
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          onClick={() => handleRoute("/register")}
        >
          Register
        </motion.button>
      </div>
    </main>
  );
};

export default WelcomePage;
