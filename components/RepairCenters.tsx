'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { API_BASE_URL } from '../utils/config'

interface RepairCenter {
  _id: string
  name: string
  address: string
  phone: string
}

const RepairCenters: React.FC = () => {
  const [repairCenters, setRepairCenters] = useState<RepairCenter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      fetchRepairCenters()
    } else {
      setError('You must be logged in to view repair centers')
      setLoading(false)
    }
  }, [isAuthenticated])

  const fetchRepairCenters = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/api/repair-centers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setRepairCenters(data)
      } else {
        setError('Failed to fetch repair centers')
      }
    } catch (error) {
      console.error('Error fetching repair centers:', error)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center mt-8">Loading repair centers...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Repair Centers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repairCenters.map((center) => (
          <div key={center._id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{center.name}</h3>
            <p><strong>Address:</strong> {center.address}</p>
            <p><strong>Phone:</strong> {center.phone}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RepairCenters

