import express from 'express';
import { submitFeedback, getFeedbackForClaim } from '../controllers/feedbackController';

const router = express.Router();

router.post('/', submitFeedback);
router.get('/claim/:claimId', getFeedbackForClaim);

export default router;

