import { Request, Response } from 'express';
import { register, login } from '../controllers/authController';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject = {};

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    };
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };
      mockRequest.body = userData;

      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (User.prototype.save as jest.Mock).mockResolvedValue(userData);

      await register(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObject).toEqual({ message: 'User created successfully' });
    });

    it('should return error if user already exists', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Existing User',
      };
      mockRequest.body = userData;

      (User.findOne as jest.Mock).mockResolvedValue(userData);

      await register(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toEqual({ message: 'User already exists' });
    });
  });

  describe('login', () => {
    it('should login user and return token', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
      };
      mockRequest.body = userData;

      const foundUser = {
        ...userData,
        _id: 'user_id',
      };

      (User.findOne as jest.Mock).mockResolvedValue(foundUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('mock_token');

      await login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual({ token: 'mock_token' });
    });

    it('should return error for invalid credentials', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      mockRequest.body = userData;

      (User.findOne as jest.Mock).mockResolvedValue(null);

      await login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toEqual({ message: 'User not found' });
    });
  });
});

