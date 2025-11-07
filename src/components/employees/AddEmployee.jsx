import React, { useState } from 'react';
import API from '../../services/api';

export default function AddEmployee() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await API.post(
        '/employee/add',
        { fullName, email, idNumber, accountNumber, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setFullName('');
      setEmail('');
      setIdNumber('');
      setAccountNumber('');
      setPassword('');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to add employee');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
      {message && <p className="mb-4 text-center text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border rounded p-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="ID Number"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          className="border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="border rounded p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold shadow"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

//code attribution
//The following code was taken from W3Schools:
//Article:W3SChools
//Link:https://www.w3schools.com/html/html_div.asp
//<div>
  //<h2>London</h2>
  //<p>London is the capital city of England.</p>
  //<p>London has over 9 million inhabitants.</p>
//</div>