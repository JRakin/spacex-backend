import axios from 'axios';
import mongoose from 'mongoose';
import LaunchService from './launches.service';
import Launch from '../models/launch.model';
import { ILaunch } from '../interfaces/launches.interface';

jest.mock('axios');
jest.mock('../models/launch.model');

describe('LaunchService', () => {
    let launchService: LaunchService;

    beforeEach(() => {
        launchService = LaunchService.getInstance();
    });

    describe('getAllSpaceXLaunches', () => {
        it('should return new launches from the SpaceX API', async () => {
            const mockApiLaunches = [
                { flight_number: 1, name: 'Falcon 1', date_utc: '2006-03-24T22:30:00.000Z' },
                { flight_number: 2, name: 'Falcon 2', date_utc: '2007-03-24T22:30:00.000Z' }
            ];
            (axios.post as jest.Mock).mockResolvedValue({ data: { docs: mockApiLaunches } });

            const mockDbLaunches = [
                { flight_number: 1, name: 'Falcon 1', date_utc: new Date('2006-03-24T22:30:00.000Z') }
            ];
            (Launch.find as jest.Mock).mockReturnValue({
                sort: jest.fn().mockResolvedValue(mockDbLaunches),
            });

            const newLaunches = await launchService.getAllSpaceXLaunches();

            expect(newLaunches).toEqual([{ flight_number: 2, name: 'Falcon 2', date_utc: '2007-03-24T22:30:00.000Z' }]);
        });

        it('should return an empty array if launch already exist in DB', async () => {
            const mockApiLaunches = [
                { flight_number: 1, name: 'Falcon 1', date_utc: '2006-03-24T22:30:00.000Z' }
            ];
            (axios.post as jest.Mock).mockResolvedValue({ data: { docs: mockApiLaunches } });

            const mockDbLaunches = [
                { flight_number: 1, name: 'Falcon 1', date_utc: new Date('2006-03-24T22:30:00.000Z') }
            ];
            (Launch.find as jest.Mock).mockReturnValue({
                sort: jest.fn().mockResolvedValue(mockDbLaunches),
            });

            const newLaunches = await launchService.getAllSpaceXLaunches();

            expect(newLaunches).toEqual([]);
        });

        it('should throw an error if the API call fails', async () => {
            (axios.post as jest.Mock).mockRejectedValue(new Error('API Error'));

            await expect(launchService.getAllSpaceXLaunches()).rejects.toThrow('API Error');
        });
    });

    describe('findAllLaunches', () => {
        it('should return all launches from the database', async () => {
            const mockLaunches = [
                { flight_number: 1, name: 'Falcon 1', date_utc: '2006-03-24T22:30:00.000Z' }
            ];
            (Launch.find as jest.Mock).mockReturnValue({
                sort: jest.fn().mockResolvedValue(mockLaunches),
            });

            const launches = await launchService.findAllLaunches();

            expect(launches).toEqual(mockLaunches);
        });
    });

    describe('createLaunch', () => {
        it('should create and return a new launch', async () => {
            const mockLaunch: ILaunch = { flight_number: 2, name: 'Falcon 2', date_utc: new Date('2007-03-24T22:30:00.000Z') };
            (Launch.create as jest.Mock).mockResolvedValue(mockLaunch);

            const createdLaunch = await launchService.createLaunch(mockLaunch);

            expect(createdLaunch).toEqual(mockLaunch);
        });
    });

    describe('deleteLaunchById', () => {
        it('should delete a launch by flight number and return it', async () => {
            const mockDeletedLaunch = { flight_number: 1, name: 'Falcon 1', date_utc: '2006-03-24T22:30:00.000Z' };
            const mockId = new mongoose.Types.ObjectId().toHexString();
            (Launch.findOneAndDelete as jest.Mock).mockResolvedValue(mockDeletedLaunch);

            const deletedLaunch = await launchService.deleteLaunchById(mockId);

            expect(deletedLaunch).toEqual(true);
        });

        it('should return null if no launch is found for deletion', async () => {
            const mockId = new mongoose.Types.ObjectId().toHexString();
            (Launch.findOneAndDelete as jest.Mock).mockResolvedValue(null);

            const deletedLaunch = await launchService.deleteLaunchById(mockId);

            expect(deletedLaunch).toBe(false);
        });
    });

    describe('launchExists', () => {
        it('should return true if a launch with the flight number and date exists', async () => {
            const mockLaunch: ILaunch = { flight_number: 1, name: 'Falcon 1', date_utc: new Date('2006-03-24T22:30:00.000Z') };
            (Launch.findOne as jest.Mock).mockResolvedValue(mockLaunch);

            const exists = await launchService.isLaunchExists(1, new Date('2006-03-24T22:30:00.000Z'));

            expect(exists).toBe(true);
        });

        it('should return false if no launch exists with the given flight number and date', async () => {
            (Launch.findOne as jest.Mock).mockResolvedValue(null);

            const exists = await launchService.isLaunchExists(1, new Date('2006-03-24T22:30:00.000Z'));

            expect(exists).toBe(false);
        });
    });
});
