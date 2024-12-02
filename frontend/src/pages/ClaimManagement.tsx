import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackForm from '../components/FeedbackForm';
import DocumentUpload from '../components/DocumentUpload';

interface Claim {
  _id: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    registrationNumber: string;
  };
  claimStatus: string;
  dateSubmitted: string;
  description: string;
}

const ClaimManagement: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/claims', 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setClaims(response.data);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const handleAppeal = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/claims/${id}/appeal`, 
        {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchClaims();
    } catch (error) {
      console.error('Error appealing claim:', error);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/claims/${id}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchClaims();
    } catch (error) {
      console.error('Error cancelling claim:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Manage Claims</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {claims.map((claim) => (
          <div key={claim._id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{claim.vehicleInfo.make} {claim.vehicleInfo.model} ({claim.vehicleInfo.year})</h3>
            <p className="mb-2"><span className="font-semibold">Status:</span> {claim.claimStatus}</p>
            <p className="mb-2"><span className="font-semibold">Submitted:</span> {new Date(claim.dateSubmitted).toLocaleDateString()}</p>
            <p className="mb-4">{claim.description}</p>
            {claim.claimStatus === 'rejected' && (
              <button 
                onClick={() => handleAppeal(claim._id)}
                className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 mr-2"
              >
                Appeal
              </button>
            )}
            {claim.claimStatus === 'pending' && (
              <>
                <DocumentUpload claimId={claim._id} onUploadSuccess={fetchClaims} />
                <button 
                  onClick={() => handleCancel(claim._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mr-2"
                >
                  Cancel
                </button>
              </>
            )}
            {claim.claimStatus === 'accepted' && (
              <FeedbackForm claimId={claim._id} onSubmitSuccess={fetchClaims} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimManagement;

