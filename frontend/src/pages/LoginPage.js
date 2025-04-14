import React, { useState } from 'react'; 
import axios from 'axios'; 
import { useLogin } from '../hooks/useLogin';

const LoginPage = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const {login, isLoading, error} = useLogin(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password) 
  }

  return (
    <main className="flex items-center justify-center h-screen bg-accent font-mont">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h1 className="text-3xl font-funnel font-semibold text-center text-bat-black mb-6">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bat-black"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bat-black"
          />
          <button
            type="submit"
            className="bg-bat-black hover:bg-accent font-bold text-accent py-2 rounded-lg hover:text-bat-black hover:ring-2 hover:ring-bat-black transition"
          >
            Login
          </button>
          
          <p className='text-center text-black mt-4'>Don't have an account? <a href="/register" className='text-blue-500 font-semibold hover:underline transition'>Register</a></p>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
