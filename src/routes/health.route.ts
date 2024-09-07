import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import HealthController from "../controllers/health.controller";

class HealthRoute implements Routes {
    public router = Router();
    public healthController = HealthController.getInstance()

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`/health`, this.healthController.checkHealth);

    }
}

export default HealthRoute;