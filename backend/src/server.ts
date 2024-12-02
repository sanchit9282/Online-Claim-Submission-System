import express from 'express';
import mongoose from 'mongoose';
import documentRoutes from './routes/documentRoutes';
import repairCentersRoutes from './routes/repairCenters';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 5000;

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.options('*', cors());

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => {
    console.log('Connected to MongoDB');

    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    app.use('/api/documents', documentRoutes);
    app.use('/api/repair-centers', repairCentersRoutes);

    app.use((req, res) => {
      console.log(`Unhandled request path: ${req.method} ${req.path}`);
      res.status(404).send("Not Found");
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

