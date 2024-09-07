// tests/launchesController.test.ts
import { Request, Response, NextFunction } from 'express';
import LaunchesController from './launches.controller';
import LaunchService from '../services/launches.service';
import { ILaunch } from '../interfaces/launches.interface';

jest.mock('../services/launches.service');

describe('LaunchesController', () => {
  let launchesController: LaunchesController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    launchesController = new LaunchesController();

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('getSpaceXLaunches', () => {
    it('should return all SpaceX launches with status 200', async () => {
      const mockLaunches: ILaunch[] = [{ flight_number: 1, name: 'Falcon 1', date_utc: new Date('2006-03-24T22:30:00.000Z') }];
      (LaunchService.prototype.getAllSpaceXLaunches as jest.Mock).mockResolvedValue(mockLaunches);

      await launchesController.getSpaceXLaunches(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockLaunches);
    });

    it('should call next with error if service fails', async () => {
      const error = new Error('Service error');
      (LaunchService.prototype.getAllSpaceXLaunches as jest.Mock).mockRejectedValue(error);

      await launchesController.getSpaceXLaunches(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getLaunches', () => {
    it('should return all launches from the database with status 200', async () => {
      const mockLaunches: ILaunch[] = [{ flight_number: 1, name: 'Falcon 1', date_utc: new Date('2006-03-24T22:30:00.000Z') }];
      (LaunchService.prototype.findAllLaunches as jest.Mock).mockResolvedValue(mockLaunches);

      await launchesController.getLaunches(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockLaunches);
    });

    it('should call next with error if service fails', async () => {
      const error = new Error('Service error');
      (LaunchService.prototype.findAllLaunches as jest.Mock).mockRejectedValue(error);

      await launchesController.getLaunches(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('addLaunch', () => {
    it('should add a new launch and return status 201', async () => {
      const mockLaunch: ILaunch = { flight_number: 2, name: 'Falcon 2', date_utc: new Date('2007-03-24T22:30:00.000Z') };
      req.body = mockLaunch;

      (LaunchService.prototype.launchExists as jest.Mock).mockResolvedValue(false);
      (LaunchService.prototype.createLaunch as jest.Mock).mockResolvedValue(mockLaunch);

      await launchesController.addLaunch(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockLaunch);
    });

    it('should return 409 if launch already exists', async () => {
      const mockLaunch: ILaunch = { flight_number: 2, name: 'Falcon 2', date_utc: new Date('2007-03-24T22:30:00.000Z') };
      req.body = mockLaunch;

      (LaunchService.prototype.launchExists as jest.Mock).mockResolvedValue(true);

      await launchesController.addLaunch(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ message: 'Launch already exists' });
    });

    it('should call next with error if service fails', async () => {
      const error = new Error('Service error');
      req.body = {
        flight_number: 123,
        name: 'Test Launch',
        date_utc: '2024-01-01T00:00:00Z',
      };
      (LaunchService.prototype.launchExists as jest.Mock).mockResolvedValue(false);
      (LaunchService.prototype.createLaunch as jest.Mock).mockRejectedValue(error);

      await launchesController.addLaunch(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteLaunch', () => {
    it('should delete a launch and return status 200', async () => {
      req.params = { id: '1' };

      (LaunchService.prototype.deleteLaunchById as jest.Mock).mockResolvedValue(true);

      await launchesController.deleteLaunch(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Launch deleted successfully' });
    });

    it('should return 404 if launch not found', async () => {
      req.params = { id: '1' };

      (LaunchService.prototype.deleteLaunchById as jest.Mock).mockResolvedValue(false);

      await launchesController.deleteLaunch(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Launch not found' });
    });

    it('should call next with error if service fails', async () => {
      const error = new Error('Service error');
      req.params = { id: '1' };
      (LaunchService.prototype.deleteLaunchById as jest.Mock).mockRejectedValue(error);

      await launchesController.deleteLaunch(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
