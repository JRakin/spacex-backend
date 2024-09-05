import axios from "axios";
import { ILaunch, ILaunchResponse } from "../interfaces/launches.interface";
import Launch from "../models/launch.model";

class FlightService {
    private launches = Launch;
    private SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

    public async getAllSpaceXLaunches(): Promise<ILaunchResponse[]> {
        const queryPayload = {
            query: {},
            options: {
              sort: { date_utc: -1 },
              limit: 30,
              select: ['flight_number', 'name', 'date_utc'],
            },
          };
        const response = await axios.post(this.SPACEX_API_URL, queryPayload);
        return response.data?.docs;
    }

    public async findAllLaunches(): Promise<ILaunch[]> {
        const launches: ILaunch[] = await this.launches.find();
        return launches;
    }

}

export default FlightService;