import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import LaunchesController from "../controllers/launches.controller";

class FlightRoute implements Routes {
    public path = '/launches';
    public router = Router();
    public launchesController = new LaunchesController()

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.path}/all`, this.launchesController.getSpaceXLaunches);
        this.router.get(`${this.path}`, this.launchesController.getLaunches);
        this.router.post(`${this.path}`, this.launchesController.addLaunch);
        this.router.delete(`${this.path}/:id`, this.launchesController.deleteLaunch);
    }
}

export default FlightRoute;