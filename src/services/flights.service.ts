import { IFlight } from "../interfaces/flights.interface";
import Flight from "../models/flight.model";

class FlightService {
    private flights = Flight;

    public async findAllFlights(): Promise<IFlight[]> {
        const flights: IFlight[] = await this.flights.find();
        return flights;
    }
}

export default FlightService;