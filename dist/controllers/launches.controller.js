"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const launches_service_1 = __importDefault(require("../services/launches.service"));
class LaunchesController {
    constructor() {
        this.launchService = new launches_service_1.default();
        this.getSpaceXLaunches = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allLaunches = yield this.launchService.getAllSpaceXLaunches();
                res.status(200).json(allLaunches);
            }
            catch (error) {
                next(error);
            }
        });
        this.getLaunches = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const launchData = yield this.launchService.findAllLaunches();
                res.status(200).json(launchData);
            }
            catch (error) {
                next(error);
            }
        });
        this.addLaunch = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const launchData = req.body;
                const exists = yield this.launchService.launchExists(launchData.flight_number);
                if (exists) {
                    return res.status(409).json({ message: 'Launch already exists' });
                }
                const newLaunch = yield this.launchService.createLaunch(launchData);
                res.status(201).json(newLaunch);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteLaunch = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const deletedLaunch = yield this.launchService.deleteLaunchByFlightNumber(id);
                if (deletedLaunch) {
                    res.status(200).json({ message: 'Launch deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'Launch not found' });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = LaunchesController;
