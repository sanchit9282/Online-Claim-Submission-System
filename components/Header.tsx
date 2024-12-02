'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex justify-between items-center">
          <li>
            <Link href="/" className="text-xl font-bold text-gray-800">Claim System</Link>
          </li>
          <li>
            <ul className="flex space-x-4">
              {isAuthenticated ? (
                <>
                  <li><Link href="/submit-claim" className="text-gray-600 hover:text-gray-800">Submit Claim</Link></li>
                  <li><Link href="/manage-claims" className="text-gray-600 hover:text-gray-800">Manage Claims</Link></li>
                  <li><Link href="/repair-centers" className="text-gray-600 hover:text-gray-800">Repair Centers</Link></li>
                  <li><Link href="/profile" className="text-gray-600 hover:text-gray-800">Profile</Link></li>
                  <li><button onClick={logout} className="text-gray-600 hover:text-gray-800">Logout</button></li>
                </>
              ) : (
                <>
                  <li><Link href="/login" className="text-gray-600 hover:text-gray-800">Login</Link></li>
                  <li><Link href="/register" className="text-gray-600 hover:text-gray-800">Register</Link></li>
                </>
              )}
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

