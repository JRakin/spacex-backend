import axios from "axios";
import { ILaunch } from "../interfaces/launches.interface";
import Launch, { LaunchDocument } from "../models/launch.model";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

class LaunchService {
  private launches = Launch;
  private SPACEX_API_URL = `${process.env.SPACEX_API_URI}`;
  private static _instance: LaunchService;

  private constructor() { }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new LaunchService();
    return this._instance;
  }

  public async getAllSpaceXLaunches(): Promise<ILaunch[]> {
    const queryPayload = {
      query: {},
      options: {
        sort: { date_utc: -1 },
        limit: 30,
        select: ['flight_number', 'name', 'date_utc'],
      },
    };
    const response = await axios.post(this.SPACEX_API_URL, queryPayload);
    const launches = await this.findAllLaunches();

    const apiLaunches = response.data?.docs;

    const dbKeys = new Set(
      launches.map(launch => `${launch.flight_number}|${launch.date_utc}`)
    );

    const newLaunches = apiLaunches.filter((launch: ILaunch) => {
      const key = `${launch.flight_number}|${new Date(launch.date_utc)}`;
      return !dbKeys.has(key);
    });

    return newLaunches;
  }

  public async findAllLaunches(): Promise<ILaunch[]> {
    const launches: ILaunch[] = await this.launches.find().sort({ date_utc: -1 });
    return launches;
  }

  public async createLaunch(launch: ILaunch): Promise<LaunchDocument> {
    const createdLaunch = await this.launches.create(launch);
    return createdLaunch;
  }

  public async deleteLaunchById(id: string): Promise<boolean> {
    const objId = new mongoose.Types.ObjectId(id)
    const deletedLaunch = await this.launches.findOneAndDelete({ _id: objId });
    if (!deletedLaunch) {
      return false;
    }
    return true;

  }

  async isLaunchExists(flight_number: number, date_utc: Date): Promise<boolean> {
    const launch = await this.launches.findOne({ flight_number, date_utc });
    return !!launch;
  }

}

export default LaunchService;