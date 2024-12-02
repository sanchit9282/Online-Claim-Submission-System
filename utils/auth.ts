import { NextApiRequest } from 'next'
import jwt from 'jsonwebtoken'

export const verifyToken = (req: NextApiRequest) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    console.error("No authorization header found");
    return null;
  }

  const token = authHeader.split(' ')[1];
  console.log('Token received for verification:', token);
  if (!token) {
    console.error("Token not found in the authorization header");
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    console.log("Token successfully verified:", decoded);
    return decoded
  } catch (error) {
    console.error("Error while verifying token:", error);
    return null
  }
}

