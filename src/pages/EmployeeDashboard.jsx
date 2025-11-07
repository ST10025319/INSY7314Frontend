import React from 'react';
import { Link } from 'react-router-dom';

export default function EmployeeDashboard() {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-r from-indigo-400 via-pink-300 to-yellow-200 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-white">Employee Dashboard</h2>
      <div className="flex flex-col gap-4">
        <Link
          to="/employee/add"
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-center font-semibold shadow"
        >
          Add New Employee
        </Link>
        <Link
          to="/employee/transactions"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-center font-semibold shadow"
        >
          View All Customer Transactions
        </Link>
      </div>
    </div>
  );
}
