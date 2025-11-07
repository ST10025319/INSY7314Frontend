import React, { useState } from 'react';
import API from '../../services/api';

export default function MFAVerify() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await API.post(
        '/auth/mfa/verify',
        { code },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('MFA setup complete! You can now log in securely.');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Invalid code, please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">Verify MFA Code</h2>
      <p className="text-gray-700 mb-4">
        Enter the 6-digit code from your Authenticator app.
      </p>

      <form onSubmit={handleVerify}>
        <input
          type="text"
          maxLength="6"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="border p-2 rounded w-full mb-4 text-center"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Verify Code
        </button>
      </form>

      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}

//code attribution
//The following method was taken from W3Schools:
//Article:W3Schools
//Link:https://www.w3schools.com/html/
//<h1>This is a Heading</h1>
//<p>This is a paragraph.</p>

//code attribution 
//The following method was taken from GeeksforGeeks:
//Article:GeeksforGeeks
//Link:https://www.geeksforgeeks.org/reactjs/reactjs-importing-exporting/
//import React from "react";
//import MyComponent from "./components/MyComponent"; 
//const App = () => {
    //return (
        //<div>
            //<MyComponent /> {/* Using the imported component */}
        //</div>
    //);
//};

//export default App;