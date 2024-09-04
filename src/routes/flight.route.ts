import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";

class FlightRoute implements Routes {
    public path = '/flight';
    public router = Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.path}`);
    }
}

export default FlightRoute;