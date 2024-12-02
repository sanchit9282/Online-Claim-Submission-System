import { Request, Response, NextFunction } from 'express';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const uploadDocument = (req: MulterRequest, res: Response, next: NextFunction): void => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }
  res.status(200).json({ message: 'File uploaded successfully' });
};
