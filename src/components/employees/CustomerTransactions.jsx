import React, { useEffect, useState } from 'react';
import API from '../../services/api';

export default function CustomerTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/payments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data.transactions || []);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading transactions...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Customer Payment History
      </h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-600 text-white text-left">
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Account</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{tx.customerId?.fullName || 'N/A'}</td>
                <td className="px-4 py-2">{tx.customerId?.accountNumber || '-'}</td>
                <td className="px-4 py-2 font-semibold text-green-600">${tx.amount.toFixed(2)}</td>
                <td className="px-4 py-2">{tx.description}</td>
                <td className="px-4 py-2">{new Date(tx.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
