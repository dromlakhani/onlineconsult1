import React, { useState } from 'react';
import { getPatientDataCSV } from '../utils';
import { ChevronLeft, Download, Lock } from 'lucide-react';

interface AdminPageProps {
  onBack: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onBack }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleAuthentication = () => {
    if (password === 'Austin@316') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleDownload = () => {
    const csvData = getPatientDataCSV();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.download = `patient_data_${timestamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Authentication</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={handleAuthentication}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
        >
          <Lock size={20} className="mr-2" />
          Authenticate
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          onClick={onBack}
          className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft size={20} />
          Back to Form
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
      <button
        onClick={handleDownload}
        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center mb-4"
      >
        <Download size={20} className="mr-2" />
        Download CSV
      </button>
      <button
        onClick={onBack}
        className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 flex items-center justify-center"
      >
        <ChevronLeft size={20} className="mr-2" />
        Back to Form
      </button>
    </div>
  );
};

export default AdminPage;
