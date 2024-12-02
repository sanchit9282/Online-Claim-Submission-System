import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '../../../utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, email, password } = req.body

      const { db } = await connectToDatabase()

      // Check if user already exists
      const existingUser = await db.collection('user').findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
      }

      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      // Create new user
      const newUser = await db.collection('user').insertOne({
        name,
        email,
        password: hashedPassword,
      })

      // Create JWT token
      const token = jwt.sign(
        { userId: newUser.insertedId },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      )

      res.status(201).json({ token, user: { name, email } })
    } catch (error) {
      console.error('Registration error:', error)
      res.status(500).json({ message: 'Server error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

