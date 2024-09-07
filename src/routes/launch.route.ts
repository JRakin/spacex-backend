import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import LaunchesController from "../controllers/launches.controller";
import { validateLaunchData } from "../middlewares/validationMiddleware";

class FlightRoute implements Routes {
    public router = Router();
    public launchesController = LaunchesController.getInstance()

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`/all`, this.launchesController.getSpaceXLaunches);
        this.router.get(`/`, this.launchesController.getLaunches);
        this.router.post(`/`, validateLaunchData, this.launchesController.addLaunch);
        this.router.delete(`/:id`, this.launchesController.deleteLaunch);
    }
}

export default FlightRoute;