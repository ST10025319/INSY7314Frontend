import React, { useEffect, useState } from 'react';
import API from '../../services/api';

export default function VerifyPayment() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await API.get('/payments');
        setPayments(res.data);
      } catch (err) {
        console.error('Error fetching payments');
      }
    };
    fetchPayments();
  }, []);

  const handleVerify = async (id) => {
    try {
      await API.put(`/payments/${id}/verify`);
      setPayments(payments.map(p => p._id === id ? { ...p, verified: true } : p));
    } catch (err) {
      alert('Verification failed');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Pending Payments</h2>
      <ul className="space-y-2">
        {payments.filter(p => !p.verified).map(p => (
          <li key={p._id} className="p-4 bg-gray-50 border rounded">
            <div><strong>Amount:</strong> {p.amount} {p.currency}</div>
            <div><strong>Payee:</strong> {p.payeeAccount}</div>
            <div><strong>SWIFT:</strong> {p.swiftCode}</div>
            <button
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
              onClick={() => handleVerify(p._id)}
            >
              Verify & Submit to SWIFT
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}