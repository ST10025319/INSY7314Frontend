import React, { useEffect, useState } from 'react';
import API from '../../services/api';

export default function PaymentList() {
  const [payments, setPayments] = useState([]);
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  useEffect(() => {
  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/payments', { // <-- must match backend
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(res.data.transactions || []);
    } catch (err) {
      console.error('Error fetching payments:', err);
    }
  };
  fetchPayments();
}, []);



  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Your Payments</h2>
      {payments.length === 0 ? (
        <p className="text-gray-500">No payments found.</p>
      ) : (
        <ul className="space-y-2">
          {payments.map(p => (
            <li key={p._id} className="p-3 bg-gray-50 border rounded">
              <div><strong>Amount:</strong> {p.amount} {p.currency}</div>
              <div><strong>Description:</strong> {p.description}</div>
              <div><strong>Status:</strong> {p.verified ? 'Verified' : ' Pending'}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}