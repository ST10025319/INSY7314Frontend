import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-white font-extrabold text-2xl tracking-tight hover:text-gray-200 transition"
        >
          Payments Portal
        </Link>

        {/* Links */}
        <div className="flex items-center gap-5">
          {!user && (
            <>
              <Link to="/login" className="text-white font-medium hover:text-gray-200">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-indigo-600 font-semibold px-3 py-1.5 rounded-lg shadow hover:bg-gray-100 transition"
              >
                Register
              </Link>
            </>
          )}

         

          {user?.role === 'employee' && (
            <>
              <Link to="/employee" className="text-white hover:text-gray-200 font-medium">
                Dashboard
              </Link>
              <Link to="/employee/add" className="text-white hover:text-gray-200 font-medium">
                Add Employee
              </Link>
              <Link to="/employee/transactions" className="text-white hover:text-gray-200 font-medium">
                Customer Transactions
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1.5 rounded-lg shadow transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
