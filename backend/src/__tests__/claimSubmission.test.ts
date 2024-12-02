import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import authRoutes from '../routes/authRoutes';
import claimRoutes from '../routes/claimRoutes';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/claims', claimRoutes);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Claim Submission Flow', () => {
  let authToken: string;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.status).toBe(201);
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    authToken = res.body.token;
  });

  it('should submit a new claim', async () => {
    const res = await request(app)
      .post('/api/claims')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        vehicleInfo: {
          make: 'Toyota',
          model: 'Corolla',
          year: 2020,
          registrationNumber: 'ABC123',
        },
        description: 'Test claim submission',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get the submitted claim', async () => {
    const submitRes = await request(app)
      .post('/api/claims')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        vehicleInfo: {
          make: 'Honda',
          model: 'Civic',
          year: 2019,
          registrationNumber: 'XYZ789',
        },
        description: 'Another test claim',
      });

    const claimId = submitRes.body._id;

    const getRes = await request(app)
      .get(`/api/claims/${claimId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body).toHaveProperty('_id', claimId);
    expect(getRes.body.vehicleInfo).toEqual({
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      registrationNumber: 'XYZ789',
    });
  });
});

