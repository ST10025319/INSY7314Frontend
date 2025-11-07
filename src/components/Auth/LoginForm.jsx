import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { Lock, Mail, KeyRound } from 'lucide-react';

export default function LoginForm({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaStep, setMfaStep] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });

      if (res.data.mfaRequired) {
        setUserId(res.data.userId);
        setMfaStep(true);
        return;
      }

      if (!res.data.token) {
        alert(res.data.error || 'Login failed. Check your credentials.');
        return;
      }

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.fullName);

      setUser({ name: res.data.fullName, role: res.data.role });

      navigate(res.data.role === 'employee' ? '/employee' : '/customer');
    } catch (err) {
      console.error('Login error:', err.response?.data || err);
      alert(err.response?.data?.error || 'Login failed. Check your credentials.');
    }
  };

  const handleMfaVerify = async () => {
    try {
      const res = await API.post('/auth/mfa/login', { userId, token });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.fullName);

      setUser({ name: res.data.fullName, role: res.data.role });
      navigate(res.data.role === 'customer' ? '/customer' : '/employee');
    } catch (err) {
      alert(err.response?.data?.error || 'Invalid MFA token.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-400">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {mfaStep ? 'MFA Verification' : 'Welcome Back'}
        </h2>

        {!mfaStep ? (
          <>
            <div className="flex items-center bg-white/80 rounded-lg mb-4 p-2">
              <Mail className="text-blue-600 mr-2" />
              <input
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-transparent flex-1 outline-none text-gray-700"
              />
            </div>
            <div className="flex items-center bg-white/80 rounded-lg mb-6 p-2">
              <Lock className="text-blue-600 mr-2" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-transparent flex-1 outline-none text-gray-700"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center bg-white/80 rounded-lg mb-6 p-2">
              <KeyRound className="text-green-600 mr-2" />
              <input
                placeholder="Enter 6-digit MFA token"
                value={token}
                onChange={e => setToken(e.target.value)}
                className="bg-transparent flex-1 outline-none text-gray-700"
              />
            </div>
            <button
              onClick={handleMfaVerify}
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              Verify MFA
            </button>
          </>
        )}
      </div>
    </div>
  );
}
