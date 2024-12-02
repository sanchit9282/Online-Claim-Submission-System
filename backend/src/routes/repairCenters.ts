import express from 'express';
import { getRepairCenters } from '../controllers/repairCentersController';

console.log("repairCenters route file loaded");

const router = express.Router();

// Define the route to get all repair centers
router.get('/', getRepairCenters);

export default router;
