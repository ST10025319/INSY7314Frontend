import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

export default function RegisterForm() {
  const [form, setForm] = useState({ fullName: '', email: '', idNumber: '', accountNumber: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registration successful! Please login.');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {['fullName', 'email', 'idNumber', 'accountNumber', 'password'].map(field => (
          <input
            key={field}
            name={field}
            type={field === 'password' ? 'password' : 'text'}
            placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            value={form[field]}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
        ))}
        <button type="submit" className="bg-white text-purple-600 font-bold py-2 rounded shadow hover:bg-gray-200 transition">
          Register
        </button>
      </form>
    </div>
  );
}
