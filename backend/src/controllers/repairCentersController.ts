import { Request, Response } from 'express';

// Sample repair centers data
const repairCenters = [
  { _id: '1', name: 'Repair Center A', address: '123 Main St', phone: '123-456-7890' },
  { _id: '2', name: 'Repair Center B', address: '456 Oak St', phone: '987-654-3210' }
];

export const getRepairCenters = (req: Request, res: Response) => {
  console.log('getRepairCenters called');
  try {
    res.status(200).json(repairCenters);
  } catch (error) {
    console.error('Error in getRepairCenters:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
