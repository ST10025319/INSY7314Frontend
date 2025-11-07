import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { QRCodeSVG } from 'qrcode.react';

export default function MFASetup() {
  const [qrUrl, setQrUrl] = useState('');
  const [alreadyEnabled, setAlreadyEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMFA = async () => {
      try {
        const res = await API.post('/auth/mfa/setup');
        setQrUrl(res.data.otpauthUrl);
        setAlreadyEnabled(res.data.alreadyEnabled);
      } catch (err) {
        alert(err.response?.data?.error || 'Failed to load MFA setup');
      }
    };
    fetchMFA();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-gradient-to-r from-pink-400 to-yellow-400 rounded-xl p-6 shadow-lg mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Setup Multi-Factor Authentication</h2>
      {alreadyEnabled ? (
        <p className="text-green-700 font-semibold mb-4">MFA already enabled!</p>
      ) : (
        <p className="text-white mb-4">Scan this QR code with your Authenticator app</p>
      )}
      {qrUrl && <QRCodeSVG value={qrUrl} size={200} className="mx-auto mb-4" />}
      <button onClick={() => navigate('/mfa-verify')} className="py-2 px-4 bg-white text-pink-500 rounded font-bold shadow hover:bg-gray-200 transition">
        Continue to Verify
      </button>
    </div>
  );
}
