import React, { useState } from 'react';
import axios from 'axios';

const ClaimSubmission: React.FC = () => {
  const [vehicleInfo, setVehicleInfo] = useState({
    make: '',
    model: '',
    year: '',
    registrationNumber: ''
  });
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/claims', 
        { vehicleInfo, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Check if the response indicates a successful operation
      if (response.status === 201) {
        setSuccessMessage('Claim successfully submitted!');
        // Optionally redirect to Manage Claims page
        setTimeout(() => {
          window.location.href = '/manage-claims';
      }, 2000);
    }

    // Reset fields
      setVehicleInfo({ make: '', model: '', year: '', registrationNumber: '' });
      setDescription('');

    } catch (error) {
      console.error('Claim submission error:', error);
      setSuccessMessage('Error submitting claim. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      {successMessage && (
        <div className={`mb-4 p-4 rounded-md ${successMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {successMessage}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-6 text-center">Submit a Claim</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Vehicle Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Make"
              value={vehicleInfo.make}
              onChange={(e) => setVehicleInfo({...vehicleInfo, make: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Model"
              value={vehicleInfo.model}
              onChange={(e) => setVehicleInfo({...vehicleInfo, model: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Year"
              value={vehicleInfo.year}
              onChange={(e) => setVehicleInfo({...vehicleInfo, year: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Registration Number"
              value={vehicleInfo.registrationNumber}
              onChange={(e) => setVehicleInfo({...vehicleInfo, registrationNumber: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Claim Description</h3>
          <textarea
            placeholder="Describe your claim"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Claim
        </button>
      </form>
    </div>
  );
};

export default ClaimSubmission;

