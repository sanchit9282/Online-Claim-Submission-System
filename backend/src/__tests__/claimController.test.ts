import { Request, Response } from 'express';
import { createClaim, updateClaim, getClaim } from '../controllers/claimController';
import Claim from '../models/Claim';
import User from '../models/User';

jest.mock('../models/Claim');
jest.mock('../models/User');

describe('Claim Controller', () => {
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

  describe('createClaim', () => {
    it('should create a new claim', async () => {
      const claimData = {
        userId: 'user_id',
        vehicleInfo: {
          make: 'Toyota',
          model: 'Corolla',
          year: 2020,
          registrationNumber: 'ABC123',
        },
        description: 'Test claim',
      };
      mockRequest.body = claimData;

      const savedClaim = { ...claimData, _id: 'claim_id' };
      (Claim.prototype.save as jest.Mock).mockResolvedValue(savedClaim);
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

      await createClaim(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObject).toEqual(savedClaim);
    });
  });

  describe('updateClaim', () => {
    it('should update an existing claim', async () => {
      const claimId = 'claim_id';
      const updateData = {
        claimStatus: 'accepted',
      };
      mockRequest.params = { id: claimId };
      mockRequest.body = updateData;

      const updatedClaim = { _id: claimId, ...updateData };
      (Claim.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedClaim);

      await updateClaim(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(updatedClaim);
    });

    it('should return 404 if claim not found', async () => {
      const claimId = 'nonexistent_id';
      mockRequest.params = { id: claimId };
      mockRequest.body = { claimStatus: 'accepted' };

      (Claim.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await updateClaim(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toEqual({ message: 'Claim not found' });
    });
  });

  describe('getClaim', () => {
    it('should return a claim by id', async () => {
      const claimId = 'claim_id';
      mockRequest.params = { id: claimId };

      const claim = { _id: claimId, userId: 'user_id', description: 'Test claim' };
      (Claim.findById as jest.Mock).mockResolvedValue(claim);

      await getClaim(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(claim);
    });

    it('should return 404 if claim not found', async () => {
      const claimId = 'nonexistent_id';
      mockRequest.params = { id: claimId };

      (Claim.findById as jest.Mock).mockResolvedValue(null);

      await getClaim(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toEqual({ message: 'Claim not found' });
    });
  });
});

