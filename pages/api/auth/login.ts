import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '../../../utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body

      const { db } = await connectToDatabase()

      // Find user
      const user = await db.collection('user').findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      )

      res.status(200).json({ token, user: { name: user.name, email: user.email } })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ message: 'Server error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

