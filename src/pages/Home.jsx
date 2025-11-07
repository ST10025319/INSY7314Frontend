import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Payments Portal</h1>
      <div className="flex gap-4">
        <button onClick={() => navigate('/login')} className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">Login</button>
        <button onClick={() => navigate('/register')} className="px-6 py-3 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition">Register</button>
      </div>
    </div>
  );
}
