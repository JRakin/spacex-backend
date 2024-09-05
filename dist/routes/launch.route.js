"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const launches_controller_1 = __importDefault(require("../controllers/launches.controller"));
class FlightRoute {
    constructor() {
        this.path = '/launches';
        this.router = (0, express_1.Router)();
        this.launchesController = new launches_controller_1.default();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(`${this.path}/all`, this.launchesController.getSpaceXLaunches);
    }
}
exports.default = FlightRoute;
