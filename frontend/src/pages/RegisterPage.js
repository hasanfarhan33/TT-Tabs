import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("You wanna register!");
  };

  return (
    <main className="flex items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
            required
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
          >
            Submit
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
