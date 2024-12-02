import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb';
import { verifyToken } from '../../../utils/auth';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      console.log('Received GET request for user profile');
      // Verify the user using JWT token
      const user = await verifyToken(req);
      console.log('Decoded user from token:', user);
      if (!user) {
        console.error('User verification failed');
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Connect to the database
      const { db } = await connectToDatabase();

      // Find the user by the userId extracted from the token
      
      const userId = new ObjectId(user.userId);
      console.log('User verification successful. Fetching user details for userId:', userId);
      const userDetails = await db.collection('user').findOne({ _id: userId });
      if (!userDetails) {
        console.error('User not found in the database for userId:', user.userId);
        return res.status(404).json({ message: 'User not found' });
      }

      // Respond with user information
      const { name, email } = userDetails;
      res.status(200).json({ name, email });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
