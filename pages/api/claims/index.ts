import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../utils/mongodb'
import { verifyToken } from '../../../utils/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const user = await verifyToken(req)
      if (!user) {
        console.error('Unauthorized request: Invalid token');
        return res.status(401).json({ message: 'Unauthorized' })
      }

      const { db } = await connectToDatabase()

      const claims = await db.collection('claims')
        .find({ userId: user.userId })
        .toArray()

      res.status(200).json(claims)
    } catch (error) {
      console.error('Error fetching claims:', error)
      res.status(500).json({ message: 'Server error' })
    }
  } else if (req.method === 'POST') {
    try {
      const user = await verifyToken(req);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { vehicleInfo, description } = req.body;
      if (!vehicleInfo || !description) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const { db } = await connectToDatabase();
      const newClaim = {
        userId: user.userId,
        vehicleInfo,
        description,
        claimStatus: 'pending',
        dateSubmitted: new Date().toISOString(),
      };

      console.log('Received claim data:', vehicleInfo, description);
      console.log('Inserting claim for user:', user.userId);
      const result = await db.collection('claims').insertOne(newClaim);
      console.log('Insert result:', result);

      return res.status(201).json({ message: 'Claim successfully submitted', data: { ...newClaim, _id: result.insertedId } });
    } catch (error) {
      console.error('Error submitting claim:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

