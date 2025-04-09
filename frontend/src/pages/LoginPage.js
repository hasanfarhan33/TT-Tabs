import React, { useState } from 'react'; 
import axios from 'axios'; 

const LoginPage = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("You wanna login!"); 
  }

  return (
    <main className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
