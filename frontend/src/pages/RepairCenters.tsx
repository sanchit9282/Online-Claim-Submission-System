import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/config';

interface RepairCenter {
  _id: string;
  name: string;
  address: string;
  phone: string;
}

const RepairCenters: React.FC = () => {
  const [repairCenters, setRepairCenters] = useState<RepairCenter[]>([]);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => setUserLocation(position.coords),
      (error) => console.error('Error getting location:', error)
    );

    // Fetch repair centers
    const fetchRepairCenters = async () => {
      console.log('Attempting to fetch repair centers...');
      try {
        const response = await axios.get(`http://localhost:5000/api/repair-centers`);
        setRepairCenters(response.data as RepairCenter[]);
      } catch (error) {
        console.error('Error fetching repair centers:', error);
      }
    };

    fetchRepairCenters();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Nearby Repair Centers</h2>
      {userLocation ? (
        <p className="mb-4">Your location: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}</p>
      ) : (
        <p className="mb-4">Getting your location...</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repairCenters.map((center) => (
          <div key={center._id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{center.name}</h3>
            <p className="mb-2">{center.address}</p>
            <p>{center.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepairCenters;

