import React, { useState } from 'react';
import API from '../../services/api';

export default function AddPayment() {
  const [form, setForm] = useState({ amount: '', description: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/payments', form);
      alert('Payment added successfully!');
      setForm({ amount: '', description: '' });
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add payment.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-purple-600">Add Payment</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          value={form.amount}
          placeholder="Amount"
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-purple-600 text-white py-2 rounded shadow hover:bg-purple-700 transition">
          Submit Payment
        </button>
      </form>
    </div>
  );
}
