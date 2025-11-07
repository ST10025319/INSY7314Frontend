import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CustomerDashboard from './pages/CustomerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import RegisterForm from './components/Auth/RegisterForm';
import LoginForm from './components/Auth/LoginForm';
import MFASetup from './components/Auth/MFASetup';
import AddEmployee from './components/employees/AddEmployee';
import CustomerTransactions from './components/employees/CustomerTransactions';
import Navbar from './components/Layout/Navbar';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');

  if (token && role) {
    setUser({ name, role });
  } else {
    setUser(null);
  }
}, []); 


  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="p-6 bg-gray-50 min-h-screen">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/mfa-setup" element={<MFASetup />} />

          {/* Customer routes */}
          <Route path="/customer" element={<CustomerDashboard />} />

          {/* Employee routes */}
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/add" element={<AddEmployee />} />
          <Route path="/employee/transactions" element={<CustomerTransactions />} />
        </Routes>
      </div>
    </Router>
  );
}
