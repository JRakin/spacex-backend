import { NextFunction, Request, Response } from "express";
import { IFlight } from "../interfaces/flights.interface";
import FlightService from "../services/flights.service";

class FlightsController {
    public flightService = new FlightService();

    public getFlights = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findFlightData: IFlight[] = await this.flightService.findAllFlights();

            res.status(200).json({ data: findFlightData, message: 'find saved data' });
        } catch (error) {
            next(error);
        }
    }
}

export default FlightsController;