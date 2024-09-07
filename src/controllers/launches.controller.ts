import { NextFunction, Request, Response } from "express";
import { ILaunch, LaunchRequest } from "../interfaces/launches.interface";
import LaunchService from "../services/launches.service";

class LaunchesController {
    public launchService = new LaunchService();

    public getSpaceXLaunches = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allLaunches: ILaunch[] = await this.launchService.getAllSpaceXLaunches();
            res.status(200).json(allLaunches);
        } catch (error) {
            next(error);
        }
    }

    public getLaunches = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const launchData: ILaunch[] = await this.launchService.findAllLaunches();

            res.status(200).json(launchData);
        } catch (error) {
            next(error);
        }
    }

    public addLaunch = async (req: LaunchRequest, res: Response, next: NextFunction) => {
        try {
            const launchData: ILaunch = req.body;
            const exists = await this.launchService.launchExists(launchData.flight_number, launchData.date_utc);

            if (exists) {
                return res.status(409).json({ message: 'Launch already exists' });
            }
            const newLaunch = await this.launchService.createLaunch(launchData);
            res.status(201).json(newLaunch);
        } catch (error) {
            next(error);
        }
    }

    public deleteLaunch = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            const deletedLaunch = await this.launchService.deleteLaunchById(id);
            if (deletedLaunch) {
                res.status(200).json({ message: 'Launch deleted successfully' });
              } else {
                res.status(404).json({ error: 'Launch not found' });
              }
        } catch (error) {
            next(error);
        }
    }
}

export default LaunchesController;