import { NextFunction, Request, Response } from "express";
import { ILaunch, ILaunchResponse } from "../interfaces/launches.interface";
import LaunchService from "../services/launches.service";

class LaunchesController {
    public launchService = new LaunchService();

    public getSpaceXLaunches = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allLaunches: ILaunchResponse[] = await this.launchService.getAllSpaceXLaunches();
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
}

export default LaunchesController;