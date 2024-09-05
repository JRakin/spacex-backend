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
const axios_1 = __importDefault(require("axios"));
const launch_model_1 = __importDefault(require("../models/launch.model"));
class FlightService {
    constructor() {
        this.launches = launch_model_1.default;
        this.SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';
    }
    getAllSpaceXLaunches() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const queryPayload = {
                query: {},
                options: {
                    sort: { date_utc: -1 },
                    limit: 30,
                    select: ['flight_number', 'name', 'date_utc'],
                },
            };
            const response = yield axios_1.default.post(this.SPACEX_API_URL, queryPayload);
            return (_a = response.data) === null || _a === void 0 ? void 0 : _a.docs;
        });
    }
    findAllLaunches() {
        return __awaiter(this, void 0, void 0, function* () {
            const launches = yield this.launches.find();
            return launches;
        });
    }
}
exports.default = FlightService;
