'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import { API_BASE_URL } from '../utils/config'

const ClaimSubmission: React.FC = () => {
  const [vehicleInfo, setVehicleInfo] = useState({
    make: '',
    model: '',
    year: '',
    registrationNumber: ''
  })
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!isAuthenticated) {
      setError('You must be logged in to submit a claim')
      return
    }
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/claims`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ vehicleInfo, description }),
      })
      if (response.ok) {
        router.push('/manage-claims')
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to submit claim')
      }
    } catch (error) {
      console.error('Claim submission error:', error)
      setError('An unexpected error occurred')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Submit a Claim</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Vehicle Information</h3>
          <input
            type="text"
            placeholder="Make"
            value={vehicleInfo.make}
            onChange={(e) => setVehicleInfo({...vehicleInfo, make: e.target.value})}
            required
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Model"
            value={vehicleInfo.model}
            onChange={(e) => setVehicleInfo({...vehicleInfo, model: e.target.value})}
            required
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="number"
            placeholder="Year"
            value={vehicleInfo.year}
            onChange={(e) => setVehicleInfo({...vehicleInfo, year: e.target.value})}
            required
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Registration Number"
            value={vehicleInfo.registrationNumber}
            onChange={(e) => setVehicleInfo({...vehicleInfo, registrationNumber: e.target.value})}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Claim Description</h3>
          <textarea
            placeholder="Describe your claim"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md h-32"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Submit Claim
        </button>
      </form>
    </div>
  )
}

export default ClaimSubmission

