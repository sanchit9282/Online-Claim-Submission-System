import { Request, Response } from 'express';
import Feedback from '../models/Feedback';

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const { userId, claimId, rating, comment } = req.body;

    const newFeedback = new Feedback({
      userId,
      claimId,
      rating,
      comment
    });

    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
};

export const getFeedbackForClaim = async (req: Request, res: Response) => {
  try {
    const { claimId } = req.params;

    const feedback = await Feedback.find({ claimId });

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};

