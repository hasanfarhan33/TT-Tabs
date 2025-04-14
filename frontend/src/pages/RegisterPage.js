import React, { useState } from "react";
import axios from 'axios'; 
import { useRegister } from "../hooks/useRegister";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("")
  
  const {register, isLoading, error, success} = useRegister(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(userName, displayName, email, password); 
  };

  return (
    <main className="flex items-center justify-center h-screen bg-accent font-mont">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h1 className="text-3xl font-funnel font-semibold text-center text-button-primary mb-6">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your name"
            required
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-button-primary"
          />
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            placeholder="Username" 
            required 
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-button-primary"
            />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-button-primary"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-button-primary mb-8"
          />
          <button
            type="submit"
            className="bg-button-primary hover:bg-accent text-accent hover:text-button-primary hover:ring-2 hover:ring-button-primary py-2 rounded-lg font-bold transition"
          >
            Submit
          </button>
          
          <p className='text-center text-black mt-4'>Already have an account? <a href="/login" className='text-red-500 font-semibold hover:underline transition'>Login</a></p>
          
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
