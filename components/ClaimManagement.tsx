'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { API_BASE_URL } from '../utils/config'

interface Claim {
  _id: string
  vehicleInfo: {
    make: string
    model: string
    year: number
    registrationNumber: string
  }
  status: string
  createdAt: string
  description: string
}

const ClaimManagement: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      fetchClaims()
    } else {
      setError('You must be logged in to view claims')
      setLoading(false)
    }
  }, [isAuthenticated])

  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/claims`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setClaims(data)
      } else {
        setError('Failed to fetch claims')
      }
    } catch (error) {
      console.error('Error fetching claims:', error)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center mt-8">Loading claims...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Manage Claims</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {claims.map((claim) => (
          <div key={claim._id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{claim.vehicleInfo.make} {claim.vehicleInfo.model} ({claim.vehicleInfo.year})</h3>
            <p><strong>Status:</strong> {claim.status}</p>
            <p><strong>Submitted:</strong> {new Date(claim.createdAt).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {claim.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClaimManagement

