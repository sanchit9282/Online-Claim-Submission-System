'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { API_BASE_URL } from '../utils/config'

interface User {
  name: string
  email: string
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Fetching user profile, isAuthenticated is true");
      fetchUserProfile()
    } else {
      console.log("User is still not authenticated");
      setError('You must be logged in to view your profile')
      setLoading(false)
    }
  }, [isAuthenticated])

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      console.log('Token Obtained:', token);
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setUser(data)
      } else {
        setError('Failed to fetch user profile')
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center mt-8">Loading user profile...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>
  if (!user) return <div className="text-center mt-8">No user data available</div>

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">User Profile</h2>
      <div className="border rounded-lg p-4 shadow-sm">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  )
}

export default UserProfile

